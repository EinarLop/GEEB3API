const Sproject = require("../models/sproject");
const Tag = require("../models/tag");
const Skill = require("../models/skill");

exports.create = function (req, res) {
  res.send("Creating a project...");
  /*
  example = new Sproject({

  });
  // use the given Sproject Tags and Skills to either create them or add the reference.
  example.save()
  .then((newDoc)) => )
  .catch((err)=> {});*/
};

exports.getAll = function (req, res) {
  res.send("List of all Portfolio projects here");
};

exports.getOne = function (req, res) {
  res.send("List of specific project");
};

exports.delete = function (req, res) {
  res.send("Deleting a project..." + req.params.id);
};

exports.update = function (req, res) {
  res.send("Updating a project..." + req.params.id);
};
