const Oproject = require('../models/oproject');

// Route callback definitions

// GET actions
exports.getList = function(req, res) {
    res.send("List of all open projects here");
}
exports.getDetail = function(req, res) {
    res.send("Project detail of Open project: " + req.params.id);
}

exports.createForm = function(req, res) {
    res.send("Open Project creation form here");
}
exports.updateForm = function(req, res) {
    res.send("Open Project update form here");
}
exports.deleteForm = function(req, res) {
    res.send("Open Project delete form here");
}

// POST actions
exports.createProject = function(req,res){
    res.send("Creating a project...")
}
exports.updateProject = function(req,res){
    res.send("Updating a project..." + req.params.id);
}
exports.deleteProject = function(req,res){
    res.send("Deleting a project..." + req.params.id);
}