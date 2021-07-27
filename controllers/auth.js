const jwt = require('jsonwebtoken');
require('dotenv').config();
const admin = require('../firebase/admin');

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
}

module.exports = async function FirebaseAuth(req, res, next) {

  const authHeader = req.headers.authorization.split(' ');
  if (authHeader[0] !== 'Bearer') {
    return res.status(400).send("Auth Header badly formatted");
  }

  const idToken = authHeader[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log("Succesful token verification");
    console.log("with uid:", uid);
  } catch (error) {
    console.log("Token verification error", error);
  }
  next();
}