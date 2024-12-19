const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// http://localhost:3000/api/publication
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPost);

module.exports = router;