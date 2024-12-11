const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Password = require("../password-validation//Password");

require("dotenv").config();

// http://localhost:3000/api/auth/signup
exports.signup = (req, res, next) => {
  console.log("🎉🎉🎉USER SIGNUP🎉🎉🎉");
  console.log(req.body);
  // check the password is valid ?
  if (!Password.validate(req.body.password)) {
    return res.status(401).json({
      message:
        "⛔️ Password must contain 1 uppercase letter, 1 lowercase letter, 1 special character and 1 digit!",
    });
  } else if (req.body.password != req.body.passwordConfirm) {
    return res.status(401).json({
      message: "⛔️ Password  is not correct!",
    });
  } else if (
    Password.validate(req.body.password) &&
    req.body.password === req.body.passwordConfirm
  ) {
    // if the password is correct
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // create a new user
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          picture: "",
          description: "",
          admin: false, // first do it true create admin on POSTMAN then change it false 
        });
        user
          .save() // save the new user in the database
          .then(() => res.status(201).json({ message: "✅ User created!" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
