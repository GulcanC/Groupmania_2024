const express = require("express");
const app = express();

// connect to monoDB
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// security
// Middleware Helmet afin d'améliorer la sécurité. crossOriginResourcePolicy sur false afin d'autoriser l'affichage des images
const helmet = require("helmet")
// Mongo sanitize to sanitizes inputs against query selector injection attacks
const exMongoSanitize = require('express-mongo-sanitize')
// Morgan middleware to create logs
const morgan = require('morgan')
// HPP middleware to protect against HTTP parameter pollution attacks
const hpp = require('hpp')


// connect to mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_CLUSTER}.mongodb.net/`,
  //  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("✅ Connection to MongoDB is successful !")).catch(() => console.log("⛔️ Connection to MongoDB failed!"));

app.use(express.json());
app.use(helmet({ crossOriginResourcePoliciy: false}));
app.use(exMongoSanitize());
app.use(morgan('combined'));
app.use(hpp());

module.exports = app;