const jwt = require('jsonwebtoken');
require('dotenv').config();
const admin = require('../firebase/admin');


/* 
let secret = process.env.TOKENSECRET

module.exports = function MongoAuth(req, res, next) {

  const token = req.header("auth-token");

  if (!token) {
    console.log("No token")
    return res.status(401).send("Acces Denied");
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    console.log("Valid token. req.user:")
    console.log(req.user)   // what is userId?
    next();

  } catch (err) {
    console.log("Bad token")
    return res.status(400).send("Invalid token");
  }
} */

module.exports = async function auth(req, res, next) {

  const authHeader = req.headers.authorization.split(' ');
  if (authHeader[0] !== 'Bearer' || authHeader.length != 2) {
    return res.status(400).json("Auth Header badly formatted");
  }

  // Verify client's firebase auth Token
  try {
    const idToken = authHeader[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    res.locals.uid = uid;

    console.log("Succesfully Authenticated User:");
    console.dir(decodedToken);

  } catch (error) {

    console.log("Error while verifying:", error);
    res.status(401).json("Authentication Failed:", error);

  }

  next();
}