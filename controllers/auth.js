const jwt = require('jsonwebtoken');
require('dotenv').config();
const admin = require('../firebase/admin');

module.exports = async function auth(req, res, next) {

  const authTokenHeader = req.headers.authorization.split(' ');
  if (authTokenHeader[0] !== 'Bearer' || authTokenHeader.length != 2) {
    return res.status(400).json("Auth Header badly formatted");
  }

  // Verify client's firebase auth Token
  try {
    const idToken = authTokenHeader[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    res.locals.decodedToken = decodedToken

    console.log("Succesfully Authenticated User:", decodedToken.email);

  } catch (error) {

    console.log("Error while verifying:", error);
    res.status(401).json("Authentication Failed:", error);

  }

  next();
}