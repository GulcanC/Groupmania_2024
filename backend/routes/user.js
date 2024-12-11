const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user")

// http://localhost:3000/api/auth
router.post("/signup", userControllers.signup)

module.exports = router;