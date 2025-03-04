const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

// http://localhost:3000/api/auth/signup
router.post("/signup", userControllers.signup)
// http://localhost:3000/api/auth/login
router.post("/login", userControllers.login)
// http://localhost:3000/api/auth/:id
router.put("/:id", auth, multer, userControllers.updateUser)
// http://localhost:3000/api/auth/:id
router.delete("/:id", auth, userControllers.deleteUser)
// http://localhost:3000/api/auth/verify
router.post("/verify", auth, userControllers.verifyUser )
module.exports = router;