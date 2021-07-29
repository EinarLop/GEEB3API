const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const SECRET = process.env.TOKENSECRET;
const ObjectID = require("mongoose").mongo.ObjectID;


exports.getAll = async function (req, res) {
  const allUsers = await User.find();

  res.status(500).json(allUsers);
};


exports.getByEmail = async function (req, res) {

  const email = req.body.email;
  console.log("Find user by email", email);

  if (!email) {
    res.status(400).json("No email in request body");
  }

  const userDoc = await User.find({ email: email });
  if (!userDoc) {
    res.status(404).json("Requested email was not found");
  }

  // to verify isOwner, client compares route 'profile/:id' with userDoc.username
  console.log("Return:", userDoc[0])
  res.status(200).json(userDoc[0]);
}

exports.getByUsername = async function (req, res) {
  const username = req.body.username;

  if (!username) {
    res.status(400).json("No username in request body");
  }

  const userDoc = await User.find({ username: username });

  res.status(200).json(userDoc);
}

exports.updateUser = async function (req, res) {
  // should verify that idToken email equals requested email
  res.status(500).json("NOT YET IMPLEMENTED");
}


// LEGACY
exports.getOne = function (req, res) {
  const token = req.header("auth-token"); // returns string 'null' if not found;

  User.findById(req.params.id)
    .then((user) => {
      let visitorIsOwner = false;
      if (token !== "null") {
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
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  var user = new User({
    username,
    email,
    password,
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
  const { fullname, email, bio, college, major, semester, links, mastered, learning, want } = req.body;
  const userId = req.params.id;
  console.log("Updating user:", userId);
  try {
    const userDoc = await User.findById(userId);
    if (userDoc) {
      userDoc.fullname = fullname;
      userDoc.email = email;
      userDoc.bio = bio;
      userDoc.college = college;
      userDoc.major = major;
      userDoc.semester = semester;
      userDoc.links = links;
      userDoc.mastered = mastered;
      userDoc.learning = learning;
      userDoc.want = want;

      userDoc.save().then(updatedDoc => {
        console.log("Update result:");
        console.log(updatedDoc);
        res.send("Succesfully updated user: " + updatedDoc.fullname + " (" + updatedDoc._id + ")");
      }).catch(err => {
        console.log("Error updating:", err);
        res.status(500).json("Error updating:", err);
      });

    } else {
      console.log("No such user id found!");
      res.status(400).send("No such user id found!");
    }

  } catch (err) {
    console.log("Mongoose Error:", err);
  }
};

exports.delete = function (req, res) {
  res.send("Deleting a user..." + req.params.id);
};
