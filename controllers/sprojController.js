const Sproject = require("../models/sproject");
const Tag = require("../models/tag");
const User = require("../models/user");
const mongoose = require('mongoose');
require('dotenv').config();


exports.create = async function (req, res) {
  console.log("Creating an Sproject...");
  const { title, description, links, imageurls, tags } = req.body;
  let lowercasetags = tags.map(t => t.toLowerCase().trim());

  const { email } = res.locals.decodedToken;
  let userid;

  try {

    const userDoc = await User.findOne({ email: email }, '_id');
    if (!userDoc) {
      console.log("No corresponding MongoID was found for", email);
      res.status(404).json(error);
      return;
    }

    userid = mongoose.Types.ObjectId(userDoc['_id']);

  } catch (error) {

    console.error(error);
    res.status(500).json(error);
    return;

  }

  var sproject = new Sproject({
    title,
    description,
    userid,
    links,
    imageurls,
    tags: lowercasetags,
  });

  console.log("New sproject:");
  console.log(sproject);

  sproject
    .save()
    .then(async (newDoc) => {
      const sprojects = [newDoc._id];

      // For every tag name of S Project
      for (let i = 0; i < newDoc.tags.length; i++) {
        // Check if tag name exists
        const tagName = newDoc.tags[i];
        let tag;

        try {
          tag = await Tag.findOne({ name: tagName });

        } catch (error) {
          console.error("Error finding tagname:", error)
          throw err;
        }

        // If no tag found, create a new tag
        if (!tag) {

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
          // Update sproject list to existing tag
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
      }
      console.log("Sproject saved succesfully with tags: ", tags);
      res.status(201).json(newDoc);

    })
    .catch((err) =>
      res.status(500).json("Error saving Sproject: " + err)
    );
};

exports.getAll = function (req, res) {
  console.log("Fetch all sprojects");
  Sproject.find().populate('userid').sort({ created: 'desc' })
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json("Error: " + err));
};


exports.getOne = function (req, res) {
  Sproject.findById(req.params.id).populate('userid')
    .then((sproject) => {
      res.status(200).json(sproject);
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
  res.status(501).send("OProject update not implemented yet")
};

exports.setImages = function (req, res) {
  //Sproject.updateOne();
  return;
}

exports.deleteClosed = function (req, res) {
  Oproject.deleteMany({ status: "Closed" })
    .then(function () {
      res.send("Data deleted"); // Success
    })
    .catch(function (error) {
      res.send(error); // Failure
    });
};