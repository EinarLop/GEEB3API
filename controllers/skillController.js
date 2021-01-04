const Skill = require('../models/skill');

// Route handler definitions


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
exports.createSkill = function(req, res) {
    res.send("Create Skill not implemented");
}

exports.deleteSkill = function(req, res) {
    res.send("Delete Skill not implemented");
}

exports.updateSkill = function(req, res) {
    res.send("Update Skill not implemented");
}