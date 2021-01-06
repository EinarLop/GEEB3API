const Oproject = require("../models/oproject");
const Tag = require("../models/tag");
const Skill = require("../models/skill");

// Route callback definitions

// GET actions

// information for the object comes in req.body if we're using json
exports.create = function (req, res) {
  // const version = req.body.version;
  const title = req.body.title;
  const description = req.body.description;
  //const userid = req.body.userid
  const status = req.body.status;
  const highlights = req.body.highlights;
  const tags = req.body.tags;
  const skills = req.body.skills;

  var oproject = new Oproject({
    version: 0.1,
    title,
    description,
    //userid: '',
    status,
    highlights,
    tags,
    skills,
  });
  oproject
    .save()
    .then(() => res.json("Oproject added!"))
    .catch((err) => res.status(400).json("Error:" + err));
};

exports.getAll = function (req, res) {
  Oproject.find()
    .then((oproject) => res.json(oproject))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = function (req, res) {
  res.send("Updating a project..." + req.params.id);
};

exports.delete = function (req, res) {
  res.send("Deleting a project..." + req.params.id);
};

exports.getOne = function (req, res) {
  res.send("Deleting a project...");
};
