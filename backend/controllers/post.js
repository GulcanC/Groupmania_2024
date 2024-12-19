const Post = require("../models/Post");
const User = require("../models/User");


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

    });res.status(200).json(postArray);
   
  }).catch((error) => res.status(400).json({error}));
  console.log("💧 Get all posts !")
  console.log(req.body)
  
}
