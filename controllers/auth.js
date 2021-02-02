const jwt = require('jsonwebtoken');
require('dotenv').config();

let secret = process.env.TOKENSECRET

module.exports = function auth(req, res, next) {
    const token = req.header("auth-token");    
    if (!token) {
      console.log("No token")
      return res.status(401).send("Acces Denied");
    }
    try {
      const verified = jwt.verify(token, secret);
      req.userId = verified;
      console.log("Valid token. req.userId:")
      console.log(req.userId)   // what is userId?
      next();
    } catch (err) {
      console.log("Bad token")
      return res.status(400).send("Invalid token");
    }
}