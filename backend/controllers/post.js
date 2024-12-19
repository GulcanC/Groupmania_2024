const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");


// create post
exports.createPost = (req, res, next) => {
  const postObject = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`;
  }
  const post = new Post({
    ...postObject,
    imageUrl: imageUrl,
  });
  post
    .save()
    .then(() =>
      res
        .status(201)
        .json({ message: "✅ Post has been successfully created!", post })
    )
    .catch((error) => res.status(400).json({ error }));

  console.log("💧 Create Post 💧");
  console.log(req.body);
};

// get all posts

exports.getAllPost = (req, res, next) => {
  let postArray = [];
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      posts.forEach((post) => {
        User.findOne({ _id: post.userId })
          .then((user) => {
            console.log(post.post);
          });
        postArray.push(post);

      }); res.status(200).json(postArray);

    }).catch((error) => res.status(400).json({ error }));
  console.log("💧 Get all posts !")
  console.log(req.body)

}

// update post
exports.updatePost = (req, res, next) => {
  let imageUrl = null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`;
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { imageUrl: imageUrl, post: req.body.post },
      }
    ).then(() => {
      Post.findById({ _id: req.params.id })
        .then((post) => res.status(200).json({ message: "✅ Post has been successfully updated!", post }))
        .catch((error) => res.status(400).json({ error }));
    }).catch((error) => {
      res.status(400).json({ error })
    });
  } else {
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { post: req.body.post }
      }
    ).then(() => {
      Post.findById({ _id: req.params.id })
        .then((post) => res.status(200).json({ post }))
        .catch((error) => res.status(400).json({ error }));
    }).catch((error) => {
      res.status(400).json({ error })
    })
  }
}

// delete post 

exports.deletePost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId }).then((user) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
      if (post.userId != req.auth.userId && !user.admin) {
        res.status(401).json({
          message: "⛔️ You do not have a permission to delete the post!"
        })
      } else {
        try {
          Post.findOne({ _id: req.params.id }).then((post) => {
            if (post.imageUrl) {
              const filename = post.imageUrl.split("images/")[1];
              fs.unlink(`images/${filename}`, (error) => {
                console.log("✅ Picture has been succesfully deleted!")
                if (error) { throw error; }
              })
            } else {
              console.log("⛔️ This post has no files to delete!")

            }
            Post.deleteOne({ _id: req.params.id }).then((deleteUserPost) => {
              console.log("✅ Post has been successfully deleted!");
              res.status(200).json({
                message: "✅ Post has been successfully deleted!",
                deleteUserPost,
              })
            }).catch((error) => res.status(400).json({ error }))
          })
        } catch { (error) => res.status(500).json({ error }) }
      }
    })
  })
}


// like dislike
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post.usersLiked.includes(req.body.userId)) {
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }
        }
      ).then(() => {
        Post.findOne({ _id: req.params.id }).then((updatedPost) =>
          res.status(200).json({ message: "✅ User liked the post!", updatedPost }));
      }).catch((error) => res.status(400).json({ error }));
    } else if (post.usersLiked.includes(req.body.userId)) {
      Post.updatedOne(
        { _id: req.params.id },
        { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
      ).then(() => {
        Post.findOne({ _id: req.params.id }).then((updatedPost) =>
          res.status(200).json({ message: "✅ User unliked the post", updatedPost }))

      }).catch((error) => res.status(400).json({ error }))
    }
  })
}