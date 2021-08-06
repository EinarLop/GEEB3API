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


exports.findByEmail = async function (req, res) {
  const email = req.body.email;
  console.log("Find user by email", email);

  if (!email) {
    res.status(400).json("No email in request body");
  }

  const userDoc = await User.findOne({ email: email });
  if (!userDoc) {
    res.status(404).json("Requested email was not found");
  }

  console.log("Return:", userDoc)
  res.status(200).json(userDoc);
}

exports.findByUsername = async function (req, res) {
  const username = req.body.username;

  if (!username) {
    res.status(400).json("No username in request body");
  }

  const userDoc = await User.find({ username: username });

  res.status(200).json(userDoc);
}

exports.update = async function (req, res) {
  // verify that idToken.email equals requested email
  const authEmail = res.locals.decodedToken.email;
  const userEmail = req.params.id;

  if (authEmail !== userEmail) {
    res.status(401).json(`User ${authEmail} does not have authorization to update ${userEmail}`)
  }

  const userDoc = null;

  try {
    userDoc = await User.findOne({ email: userEmail });

  } catch (error) {
    res.status(404).json("Error finding user", userEmail);
  }

  if (userDoc) {

    const { fullname, email, bio, college, major, semester, links, mastered, learning, want } = req.body;

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

    try {
      const updatedDoc = await userDoc.save();

      console.log("updated user document:");
      console.log(updatedDoc);
      res.send("Succesfully updated:" + updatedDoc.fullname + "(email " + updatedDoc.email + ")");

    } catch (err) {
      res.status(500).json("Error updating:", err);
    }


  } else {
    res.status(404).json(`Requested User was not found`);
  }

}

exports.register = async function (req, res) {
  console.log("Creating a user...");
  console.log(req.body);

  try {
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      console.log("Username taken");
      return res.status(400).json("Username already exists");
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      console.log("Email taken");
      return res.status(400).json("Email already exists");
    }

  } catch (error) {
    console.error("Something bad happened");
    res.status(500).json("Something happened:" + error);
  }

  const username = req.body.username;
  const email = req.body.email;

  const user = new User({
    username,
    email,
  });

  user
    .save()
    .then((newDoc) => res.json("User succesfully added!" + newDoc))
    .catch((err) => {
      console.log("Error on user save", err);
      res.status(500).json(err)
    });
};


exports.getEmailFromUsername = async function (req, res) {
  console.log("Get Email From Username");
  const requestedUsername = req.params.username;
  console.log("Request:", requestedUsername);
  if (!requestedUsername) {
    res.status(400).json("No username in request body");
  }

  try {
    const userEmail = await User.findOne({ username: requestedUsername }, 'email');

    console.log("User email", userEmail);

    res.status(200).send(userEmail);

  } catch (error) {
    console.log("Something happened:", error);
    res.status(500).json(error);
  }


}





// LEGACY --- DO **NOT** USE
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

// LEGACY --- DO **NOT** USE
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
    res.header("auth-token", token).json({ userId: userExists._id });
  }
};


exports._update = async function (req, res) {
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
  res.status(501).json("Deleting a user..." + req.params.id);
};
