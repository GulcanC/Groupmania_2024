const express = require("express");
const app = express();

// connect to monoDB
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_CLUSTER}.mongodb.net/`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("✅ Connection to MongoDB is successful !")).catch(() => console.log("⛔️ Connection to MongoDB failed!"));

module.exports = app;