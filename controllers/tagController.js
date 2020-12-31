const Tag = require('../models/tag');

// Mongoose connection
var mongoose = require('mongoose');
var uri = 'mongodb+srv://geeb:geeb123@cluster0.dxgwa.mongodb.net/development01?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'MongoDB Connection Error'));

// Route handler definitions

// GET actions
exports.getList = function(req, res) {
    res.send("Tag list here.");
}
exports.getDetail = function(req, res) {
    res.send("Tag detail of: " + req.params.id);
}

exports.createForm = function(req, res) {
    res.send("Creation form for Tag");
}
exports.deleteForm = function(req, res) {
    res.send("Deletion form for Tag");
}
exports.updateForm = function(req, res) {
    res.send("Update form for Tag");
}


// POST actions
exports.createTag = function(req, res) {
    res.send("Create Tag not implemented");
}

exports.deleteTag = function(req, res) {
    res.send("Delete Tag not implemented");
}

exports.updateTag = function(req, res) {
    res.send("Update Tag not implemented");
}