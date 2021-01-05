const Tag = require("../models/tag");

// Route handler definitions

// GET actions
exports.getList = function (req, res) {
  res.send("Tag list here.");
};
exports.getDetail = function (req, res) {
  res.send("Tag detail of: " + req.params.id);
};

exports.createForm = function (req, res) {
  res.send("Creation form for Tag");
};
exports.deleteForm = function (req, res) {
  res.send("Deletion form for Tag");
};
exports.updateForm = function (req, res) {
  res.send("Update form for Tag");
};

// POST actions
exports.createTag = function (req, res) {
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

exports.deleteTag = function (req, res) {
  res.send("Delete Tag not implemented");
};

exports.updateTag = function (req, res) {
  res.send("Update Tag not implemented");
};
