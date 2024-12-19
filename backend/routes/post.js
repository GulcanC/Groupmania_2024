const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// http://localhost:3000/api/publication
router.post("/", auth, multer, postCtrl.createPost);
// http://localhost:3000/api/publication
router.get("/", postCtrl.getAllPost);
// http://localhost:3000/api/publication/:id
// http://localhost:3000/api/publication/6763ead1089bd6f357c010b7
// here Id is post id, not user id
router.put("/:id", auth, multer, postCtrl.updatePost);
// here also, Id is post id, not user id
// http://localhost:3000/api/publication/:id
router.delete("/:id", auth, multer, postCtrl.deletePost);
// http://localhost:3000/api/publication/:id/like
router.post("/:id/likeDislike", auth, postCtrl.likePost);

module.exports = router;