const bcrypt = require("bcrypt");
const User = require("../models/User");
const Password = require("../password-validation//Password");
const jwt = require("jsonwebtoken");


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

// http://localhost:3000/api/auth/login
exports.login = (req, res, next) => {
    console.log("🎉🎉🎉USER LOGIN🎉🎉🎉");
    console.log(req.body)

    // check whether email exists in the database
    User.findone({ email: req.body.email}).then((user) => {
        // if the value is null, user does not exist in the database
        if (user === null) {
            res.status(401).json({ message: "⛔️ Account does not exist! Please register!"})
        }

        // if we have a value, we have to compare the password which is in the database and user password
        else if(user !== null) {
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if(!valid) {
                    res.status(401).json({ message: "⛔️ Email and password do not match" })
                }

                // if password is correct, we have userId and token
                else if(valid) {
                    res.status(200).json({
                        message: "✅ User login is successfull",
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        picture: user.picture,
                        description: user.description,
                        _id: user._id,
                        admin: user.admin
                    })
                }
            })
        }
    })
}
