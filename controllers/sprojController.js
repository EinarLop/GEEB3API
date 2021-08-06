const Sproject = require("../models/sproject");
const Tag = require("../models/tag");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongoose').mongo.ObjectID;
require('dotenv').config();

let secret = process.env.TOKENSECRET;

exports.create = async function (req, res) {
  console.log("Creating a project...");
  const title = req.body.title;
  const description = req.body.description;
  const links = req.body.links;
  const imageurls = req.body.imageurls;
  const tags = req.body.tags;

  var sproject = new Sproject({
    title,
    description,
    userid: mongoose.Types.ObjectId(req.user.userId),
    links,
    imageurls,
    tags,
  });

  sproject
    .save()
    .then(async (newDoc) => {
      const sprojects = [newDoc._id];

      for (let i = 0; i < newDoc.tags.length; i++) {
        // for each tag name of S Project
        const tagName = newDoc.tags[i];
        let tag = await Tag.findOne({ name: tagName });

        if (!tag) {
          // Create new Tag
          tag = new Tag({
            name: tagName,
            sprojects,
          });

          tag
            .save()
            .then((newDoc) => {
              console.log("Created succesfully" + newDoc);
            })
            .catch((err) => {
              console.log("Error saving new tag:" + err);
            });
        } else {
          // Update if existing
          console.log(tag);
          console.log("New doc id:" + newDoc._id);
          tag.sprojects.push(newDoc._id);
          tag
            .save()
            .then((updatedDoc) =>
              console.log("Created succesfully" + updatedDoc)
            )
            .catch((err) => {
              console.log("Error updating tags" + err);
              throw err;
            });
        }
        // save new tags and  update existing ones
        res.status(201).json("The s project was created succesfully with tags");
      }
    })
    .catch((err) =>
      res.status(500).json("Couldn't save new S project: " + err)
    );
};

exports.getAll = function (req, res) {
  Sproject.find().populate('userid')
    .then((projects) => res.json(projects))
    .catch((err) => res.status(500).json("Error: " + err));
};

// LEGACY --- DO **NOT** USE
exports.getOne = function (req, res) {
  const token = req.header("auth-token");
  Sproject.findById(req.params.id).populate('userid')
    .then((sproject) => {

      let visitorIsOwner = false;
      if (typeof (token) != 'undefined') {
        try {
          const verified = jwt.verify(token, secret);
          let visitor = new ObjectID(verified.userId);
          if (sproject.userid.equals(visitor)) {
            visitorIsOwner = true;
          }
        } catch (err) {
          console.log("Bad token: " + err)
        }
      }
      const response = {
        project: sproject,
        isOwner: visitorIsOwner
      }
      res.json(response);   //in the front-end we must access response.data
    })
    .catch((err) => res.status(500).json("Error: " + err));

};

exports.delete = function (req, res) {
  Sproject.findOneAndDelete({ _id: req.params.id })
    .then((deletedDoc) => {
      res.send("Deleted succesfully: " + deletedDoc);
    })
    .catch((err) => {
      res.status(500).json("Error:" + err);
    });
};

exports.update = function (req, res) {
  res.send("Updating a project..." + req.params.id);
};

exports.setImages = function (req, res) {
  //Sproject.updateOne();
  return;
}

exports.deleteAll = function (req, res) {
  Sproject.deleteMany()
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};
