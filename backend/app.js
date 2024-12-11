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

// Error CORS => Cross Origin Resource Sharing, It is a security system which prevent HTTP calls between different servers, it prevents to access the unwanted requests to sensitive resources
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // tout le monde peut se connecter a notre API
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // On donne l'autorisation d'utiliser certains headers sur l'objet requête
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ); // On donne l'autorisation d'utiliser certains methodes sur l'objet requête; get post put delete patch
    next(); // permet de passer à la lecture des autres middlewares
  });

app.use(express.json());
app.use(helmet({ crossOriginResourcePoliciy: false}));
app.use(exMongoSanitize());
app.use(morgan('combined'));
app.use(hpp());

module.exports = app;