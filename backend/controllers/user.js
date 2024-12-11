const User = require("../models/User")

exports.signup = (req, res, next) => {
    console.log("🎉🎉🎉USER SIGNUP🎉🎉🎉");
    console.log(req.body);
}