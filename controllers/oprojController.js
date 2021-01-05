const Oproject = require("../models/oproject");

// Route callback definitions

// GET actions

exports.getDetail = function (req, res) {
  res.send("Project detail of Open project: " + req.params.id);
};

exports.createForm = function (req, res) {
  res.send("Open Project creation form here");
};
exports.updateForm = function (req, res) {
  res.send("Open Project update form here");
};
exports.deleteForm = function (req, res) {
  res.send("Open Project delete form here");
};

// POST actions

// information for the object comes in req.body if we're using json
exports.createProject = function (req, res) {
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

exports.showAll = function (req, res) {
  Oproject.find()
    .then((oproject) => res.json(oproject))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateProject = function (req, res) {
  res.send("Updating a project..." + req.params.id);
};
exports.deleteProject = function (req, res) {
  res.send("Deleting a project..." + req.params.id);
};
