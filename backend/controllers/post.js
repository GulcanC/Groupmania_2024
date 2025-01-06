const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");

// create post
exports.createPost = (req, res, next) => {
  const postObject = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
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

// get all posts, use mongoose $sort operator to sort the post
// createdAt:-1 the last post at the top, if you write createdAt:1, the last post will be at the bottom
exports.getAllPost = (req, res, next) => {
  let postArray = [];
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      posts.forEach((post) => {
        User.findOne({ _id: post.userId }).then((user) => {
          console.log(post.post);
        });
        postArray.push(post);
      });
      res.status(200).json(postArray);
    })
    .catch((error) => res.status(400).json({ error }));
  console.log("💧 Gat All Posts 💧");
  console.log(req.body);
};

// updatePost, The $set operator replaces the value of a field with the specified value.
exports.updatePost = (req, res, next) => {
  let imageUrl = null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { imageUrl: imageUrl, post: req.body.post },
      }
    )
      .then(() => {
        Post.findById({ _id: req.params.id })
          .then((post) =>
            res
              .status(200)
              .json({ message: "✅ Post has been successfully updated!", post })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { post: req.body.post },
      }
    )
      .then(() => {
        Post.findById({ _id: req.params.id })
          .then((post) => res.status(200).json({ post }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

// Delete post, use the file system to manage the files
exports.deletePost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId }).then((user) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
      // if you are not owner of this post and you are not admin, you can not delete the post
      if (post.userId != req.auth.userId && user.admin == "false") {
        res.status(401).json({
          message: "⛔️ You do not have permission to delete the post!",
        });
      } else {
        try {
          Post.findOne({ _id: req.params.id }).then((post) => {
            if (post.imageUrl) {
              const filename = post.imageUrl.split("images/")[1];
              fs.unlink(`images/${filename}`, (error) => {
                console.log("✅ Picture has been succesfully deleted!");
                if (error) throw error;
              });
            } else {
              console.log("⛔️ This post has no files to delete");
            }
            // here deleteUserPost will go to the frontend, it will inform that delete is successfull
            Post.deleteOne({ _id: req.params.id })
              .then((deleteUserPost) => {
                console.log("✅ Post has been succesfully deleted!");
                res.status(200).json({
                  message: "✅ Post has been successfully deleted!",
                  deleteUserPost,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          });
        } catch {
          (error) => res.status(500).json({ error });
        }
      }
    });
  });
};



// increment the number of likes with the operator $inc
// add userId in the usersLiked array with the operator $push, when the user likes the post
// remove userId from the usersLiked array with the operator $pull, when the user cancels the like

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post.usersLiked.includes(req.body.userId)) {
      Post.updateOne(
        { _id: req.params.id },
        { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
      )
        .then(() => {
          // we will use updatedPost in the fronend, be careful
          Post.findOne({ _id: req.params.id }).then((updatedPost) =>
            res
              .status(200)
              .json({ message: "✅ User liked the post!", updatedPost })
          );
        })
        .catch((error) => res.status(400).json({ error }));
    } else if (post.usersLiked.includes(req.body.userId)) {
      Post.updateOne(
        { _id: req.params.id },
        { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
      )
        .then(() => {
          Post.findOne({ _id: req.params.id }).then((updatedPost) =>
            res
              .status(200)
              .json({ message: "✅ User unliked the post", updatedPost })
          );
        })
        .catch((error) => res.status(400).json({ error }));
    }
  });
};