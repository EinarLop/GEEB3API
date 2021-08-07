require('dotenv').config();
const admin = require('../firebase/admin');

module.exports = async function auth(req, res, next) {

  const authTokenHeader = req.headers.authorization.split(' ');
  if (authTokenHeader[0] !== 'Bearer' || authTokenHeader.length != 2) {
    return res.status(400).json("Auth Header badly formatted");
  }

  try {
    // Try verifying token
    const idToken = authTokenHeader[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Store token information
    res.locals.decodedToken = decodedToken;

    console.log("Succesfully Authenticated User:", decodedToken.email);

  } catch (error) {

    console.error("Error while verifying:", error);
    res.status(401).json("Authentication Failed:", error);

  }

  next();
}


/**
 * create: sprojects, oprojects, tags
 * update: sprojects, oprojects, tags, users
 * delete: sprojects, oprojects, tags, users
 */