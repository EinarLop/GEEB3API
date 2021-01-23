const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const User = require("../models/user");
require("dotenv").config();
const SECRET= process.env.TOKENSECRET;

// Route callback definitions

// GET actions
exports.getAll = function (req, res) {
  res.send("List of all users here");
};

exports.getOne = function (req, res) {
  res.send("Send details of user: " + req.params.id);
};

// POST actions
exports.register = async function (req, res) {
  console.log("Creating a user...");

  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send("Username already exists");

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //Joi Validation -->
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  var user = new User({
    version: 0.1,
    username,
    email,
    password,
    //tags1:,
    //tags2:,
    //tags3:,
    //fullname:,
    //university:,
    //bio:,
  });

  user
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error:" + err));
};

exports.login = async function (req, res) {
  console.log(req.body);

  const userExists = await User.findOne({ username: req.body.username });
 
  if (!userExists) return res.status(400).send("Username/password is wrong");

  const validPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  ); // returns true or false
  if (!validPass) return res.status(400).send("Username/password is wrong");
  
  else{

    
    const token = jwt.sign({ userId: userExists._id }, SECRET);

   

    //res.header("auth-token", token).send(token);
    res.cookie("JWT", token, {
      maxAge: 86_400_000,
  
    });
    //cookie with id
   ;

    res.send("login succesful");
  } 

  

  // res.send({
  //   test: "hey",
  // });


};

exports.update = function (req, res) {
  res.send("Updating a user..." + req.params.id);
};

exports.delete = function (req, res) {
  res.send("Deleting a user..." + req.params.id);
};
