const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const SECRET = process.env.TOKENSECRET;
const ObjectID = require("mongoose").mongo.ObjectID;

// Route callback definitions

// GET actions
exports.getAll = function (req, res) {
  res.send("List of all users here");
};

exports.getOne = function (req, res) {
  const token = req.header("auth-token");   // returns string 'null' if not found;
  User.findById(req.params.id)
    .then((user) => {
      let visitorIsOwner = false;
      if (token!=="null") {
        try {
          const verified = jwt.verify(token, SECRET);
          console.log("JWT verification:");
          console.log(verified);
          let visitor = new ObjectID(verified.userId);
          console.log("visitor:", visitor);
          console.log("user _id:", user._id);
          visitorIsOwner = user._id.equals(visitor);
        } catch (err) {
          console.log("Bad token: " + err);
        }
      }
      console.log("Backend response for isowner:", visitorIsOwner);
      const response = {
        user: user,
        isOwner: visitorIsOwner,
      };
      res.json(response); //in the front-end we must access response.data
    })
    .catch((err) => {
      console.log("Something happened:", err);
      res.status(500).json("Error: " + err);
    });
};

// POST actions
exports.register = async function (req, res) {
  console.log("Creating a user...");
  console.log(req.body);
  // Verify username not taken
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send("Username already exists");

  // Verify email not taken
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //Joi Validation ?
  const username = req.body.username;
  const email = req.body.email;
  const fullname = req.body.fullname;
  const university = req.body.university;
  const semester = req.body.semester;
  const major = req.body.major;
  const bio = req.body.bio;
  const links = req.body.links;
  const mastered = req.body.mastered;
  const learning = req.body.learning;
  const want = req.body.want;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  var user = new User({
    username,
    email,
    password,
    fullname,
    university,
    semester,
    major,
    bio,
    links,
    mastered,
    learning,
    want,
  });

  user
    .save()
    .then((newDoc) => res.json("User succesfully added!" + newDoc))
    .catch((err) => res.status(400).json("Error:" + err));
};

exports.login = async function (req, res) {
  console.log(req.body);
  // Verify user exists
  const userExists = await User.findOne({ username: req.body.username });
  if (!userExists) return res.status(400).send("Username/password is wrong");

  // Verify valid password
  const validPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  ); // returns true or false
  if (!validPass) return res.status(400).send("Username/password is wrong");
  else {
    const token = jwt.sign({ userId: userExists._id }, SECRET);
    res.header("auth-token", token).json({ userId: userExists._id }); // also send the user id. for localstorage
    // res.cookie("JWT", token, {    // token is saved to a cookie and sent back to client
    //   domain: '.geeb-3.vercel.app',
    //   maxAge: 86_400_000,
    // });
    //res.send("Login succesful. Welcome, " + userExists.username);
  }
};

exports.getMine = function (req, res) {
  //const userid = mongoose.Types.ObjectId(req.user.userId);
  let userid = new ObjectID(req.user.userId);
  console.log(userId);

  User.findById(userid)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(500).json("Error: " + err));
};

exports.update = async function (req, res) {
  // Option to use findOneAndUpdate (atomic transaction) or save (easier to read, but is not atomic, involves findOne+updateOne);
  const {fullname, email, bio, college, major, semester, links, mastered, learning, want} = req.body;
  const user_id = req.params.id;
  console.log("Updating user:", user_id);
  const userDoc = await User.findOne(user_id);
  if (userDoc) {
    userDoc.fullname = fullname;
    userDoc.email = email;
    userDoc.bio = bio;
    userDoc.college = college;
    userDoc.major = major;
    userdoc.semester = semester;
    userDoc.links = links;
    userDoc.mastered = mastered;
    userDoc.learning = learning;
    userDoc.want = want;

    userDoc.save(). then(updatedDoc => {
      console.log("Update result:");
      console.log(updatedDoc);
      res.send("Succesfully updated user: " + updatedDoc.fullname + " (" + updatedDoc._id + ")");
    }).catch(err => {
      console.log("Error updating:", err);
      res.status(500).json("Error updating:", err);
    });

  } else {
    console.log("No such user id found!");
    res.send("No such user id found!");
  }

};

exports.delete = function (req, res) {
  res.send("Deleting a user..." + req.params.id);
};
