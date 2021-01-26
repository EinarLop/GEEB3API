const async = require("async");
const mongoose = require('mongoose');
const Applicant = require("../models/applicant");

exports.create = function (req, res) {
    const userid = mongoose.Types.ObjectId(req.body.userid);
    const oprojectid = req.body.oprojectid;
    const motive = req.body.motive;

    var applicant = new Applicant({
        userid,
        oprojectid,
        motive, 
    });

    console.log("New Application:", applicant);
    applicant.save()
    .then(newDoc => res.json("New doc succesful:" + newDoc))
    .catch(err => res.status(500).json(err))
};

exports.getAll = function (req, res) {
    Applicant.find()
      .then((applicants) => res.json(applicants))
      .catch((err) => res.status(500).json("Error: " + err));
};

exports.update = function (req,res){
    res.send("Updating a application..." + req.params.id);
};
  
exports.delete = function (req, res) {
    console.log("Deleting by id: " + req.params.id);
  
    Applicant.findOneAndDelete({ _id: req.params.id })
      .then((deletedDoc) => {
        res.send("Deleted succesfully: " + deletedDoc);
      })
      .catch((err) => {
        res.status(500).json("Error:" + err);
      });
};
  
exports.deleteAll = function (req, res) {
    Applicant.deleteMany() 
      .then(function () {
        res.send("Data deleted"); // Success
      })
      .catch(function (error) {
        res.send(error); // Failure
      });
};
  
exports.getOne = function (req, res) {
    Applicant.findById(req.params.id)
    .then((application) => res.json(application))
    .catch((err) => res.status(500).json("Error: " + err));
};
  
  
exports.getByUser = function(req, res) {      // works well
    Applicant.find({userid: mongoose.Types.ObjectId(req.params.userid)})
    .then(applications => res.json(applications))
    .catch(err => res.status(500).json("Error" + err));
}


exports.updateStatus = function(req, res) {
    // status desired is in req.body
    let update = {status: req.body.status};
    Applicant.findOneAndUpdate({_id: req.params.id}, update)            // FALTA PROBAR!!
    .then(oldDoc => res.send("updated doc to:"+ "was before:" + oldDoc))
    .catch(err => res.status(500).json("Error" + err));
}

exports.updateDescription = function(req, res){
    //Applicant can update the description
    let update = {status: req.body.motive};
    Applicant.findOneAndUpdate({_id: req.params.id},update)
    .then(oldDoc => res.send("update doc description to:"+"was before"+oldDoc))
    .catch(err=> res.status(500).json("Error"+err));
    
}