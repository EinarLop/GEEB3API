const User = require('../models/oproject');

// Route callback definitions

// GET actions
exports.getList = function(req, res) {
    res.send("List of all users here");
}
exports.getDetail = function(req, res) {
    res.send("Detail of user: " + req.params.id);
}

exports.createForm = function(req, res) {
    res.send("User creation form here");
}
exports.updateForm = function(req, res) {
    res.send("User update form here");
}
exports.deleteForm = function(req, res) {
    res.send("User delete form here");
}

// POST actions
exports.createProject = function(req,res){
    res.send("Creating a user...")
}
exports.updateProject = function(req,res){
    res.send("Updating a user..." + req.params.id);
}
exports.deleteProject = function(req,res){
    res.send("Deleting a user..." + req.params.id);
}