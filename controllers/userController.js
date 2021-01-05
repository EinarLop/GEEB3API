const bcrypt = require("bcrypt");
const User = require("../models/user");

// Route callback definitions

// GET actions
exports.getList = function (req, res) {
  res.send("List of all users here");
};
exports.getDetail = function (req, res) {
  res.send("Detail of user: " + req.params.id);
};

exports.registerForm = function (req, res) {
  res.send("User creation form here");
};
exports.updateForm = function (req, res) {
  res.send("User update form here");
};
exports.deleteForm = function (req, res) {
  res.send("User delete form here");
};

// POST actions
exports.registerUser = async function (req, res) {
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

exports.loginUser = async function (req, res) {
  const userExists = await User.findOne({ username: req.body.username });
  if (!userExists) return res.status(400).send("Username/password is wrong");

  const validPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  ); // returns true or false
  if (!validPass) return res.status(400).send("Username/password is wrong");
  else res.send("login succesful");
};

exports.updateUser = function (req, res) {
  res.send("Updating a user..." + req.params.id);
};
exports.deleteUser = function (req, res) {
  res.send("Deleting a user..." + req.params.id);
};
