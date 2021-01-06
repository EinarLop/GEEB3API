const Tag = require("../models/tag");

// GET actions
exports.getAll = function (req, res) {
  // fecth all tags from db
};

exports.getOne = function (req, res) {
  res.send("Get tag with id: " + req.params.id);
};

// POST actions
exports.create = function (req, res) {
  const name = req.body.name;
  const oprojects = req.body.oprojects;
  const sprojects = req.body.sprojects;

  let tag = new Tag({
    name,
    oprojects,
    sprojects,
  });

  tag
    .save()
    .then(() => res.json("Tag added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.delete = function (req, res) {
  res.send("Delete Tag not implemented");
};

exports.update = function (req, res) {
  res.send("Update Tag not implemented");
};
