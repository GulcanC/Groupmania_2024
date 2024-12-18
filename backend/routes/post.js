const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/post");
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

// http://localhost:3000/api/auth/publication
router.post("/", userControllers.createPost)

module.exports = router;