const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user")

// http://localhost:3000/api/auth/signup
router.post("/signup", userControllers.signup)
// http://localhost:3000/api/auth/login
router.post("/login", userControllers.login)
// http://localhost:3000/api/auth/:id
router.put("/:id", userControllers.updateUser)
module.exports = router;