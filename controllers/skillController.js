const Skill = require("../models/skill");

// Route handler definitions

// GET actions
exports.getAll = function (req, res) {
  res.send("Skills list here.");
};

exports.getOne = function (req, res) {
  res.send("Get skill with id: " + req.params.id);
};

// POST actions
exports.create = function (req, res) {
  res.send("Create Skill not implemented");
};

exports.delete = function (req, res) {
  res.send("Delete Skill not implemented");
};

exports.deleteAll = function (req, res) {
  Skill.deleteMany()
    .then(function () {
      res.send("Data deleted"); // Success
    })
    .catch(function (error) {
      res.send(error); // Failure
    });
};

exports.update = function (req, res) {
  res.send("Update Skill not implemented");
};
