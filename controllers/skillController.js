const Skill = require('../models/skill');

// Route handler definitions

// Mongoose connection
var mongoose = require('mongoose');
var uri = 'mongodb+srv://geeb:geeb123@cluster0.dxgwa.mongodb.net/development01?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'MongoDB Connection Error'));

// GET actions
exports.getList = function(req, res) {
    res.send("Skills list here.");
}
exports.getDetail = function(req, res) {
    res.send("Skill detail of: " + req.params.id);
}

exports.createForm = function(req, res) {
    res.send("Creation form for Skill");
}
exports.deleteForm = function(req, res) {
    res.send("Deletion form for Skill");
}
exports.updateForm = function(req, res) {
    res.send("Update form for Skill");
}


// POST actions
exports.createTag = function(req, res) {
    res.send("Create Skill not implemented");
}

exports.deleteTag = function(req, res) {
    res.send("Delete Skill not implemented");
}

exports.updateTag = function(req, res) {
    res.send("Update Skill not implemented");
}