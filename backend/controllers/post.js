const Post = require("../models/Post");


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