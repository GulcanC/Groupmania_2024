const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
firstName: { type: String, required: true},
lastName: { type: String, required: true},
email: { type: String, required: true, unique: true},
password: { type: String, required: true},
passwordConfirm: { type: String, required: false},
picture: { type: String, default: "../images/avatar.jpeg"},
description: {type: String},
admin: {type: Boolean, required: true},

})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema )