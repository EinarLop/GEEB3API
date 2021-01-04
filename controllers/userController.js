const User = require('../models/user');

// Route callback definitions

// GET actions
exports.getList = function(req, res) {
    res.send("List of all users here");
}
exports.getDetail = function(req, res) {
    res.send("Detail of user: " + req.params.id);
}

exports.registerForm = function(req, res) {
    res.send("User creation form here");
}
exports.updateForm = function(req, res) {
    res.send("User update form here");
}
exports.deleteForm = function(req, res) {
    res.send("User delete form here");
}

// POST actions
exports.createUser = function(req,res){
    console.log("Creating a user...");
    //const version = req.body.version 
    //const username= req.body.username
    //const email =req.body.email
    //const password = req.body.password
    
    
    var user = new User(
        {
            version:0.1,
            username:'einar',
            email:'einar1@einar.com',
            password:'einar',
            //tags1:,
            //tags2:,
            //tags3:,
            //fullname:,
            //university:,
            //bio:,
        }
    )   

    user.save()
    .then(() => res.json("Oproject added!"))
    .catch(err => res.status(400).json('Error:' + err));
}

exports.updateUser = function(req,res){
    res.send("Updating a user..." + req.params.id);
}
exports.deleteUser = function(req,res){
    res.send("Deleting a user..." + req.params.id);
}