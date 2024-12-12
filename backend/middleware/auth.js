const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
// to take our token, we take the header and use split() method to divide the string and obtain the second value which is separated by a space
const token = req.headers.authorization.split(" ")[1];
console.log("🎉🎉🎉TOKEN🎉🎉🎉");
console.log(req.headers.authorization);

// now we have token and we have to decode this token
// use verify() method to get l'id and user
const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
console.log("🎉🎉🎉decodedToken🎉🎉🎉");
console.log(decodedToken);

// verify that token is valid
const userId = decodedToken.userId; 
req.auth = {
    userId: userId,
};
next();

    } catch (error) {
    res.status(401).json({error})
    }
} 