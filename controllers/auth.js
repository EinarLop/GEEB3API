const jwt = require('jsonwebtoken');
require('dotenv').config();

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

module.exports = function FirebaseAuth(req, res, next) {
  //
  return;
}