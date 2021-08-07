const Oproject = require("../models/oproject");
const Tag = require("../models/tag");
const Skill = require("../models/skill");
const async = require("async");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.create = function (req, res) {
  // TODO: refactor for firebase auth
  console.log(req.user); // req.user set in auth middleware
  const title = req.body.title;
  const description = req.body.description;
  const userid = mongoose.Types.ObjectId(req.user.userId);
  const status = req.body.status;
  const highlights = req.body.highlights;
  const desirables = req.body.desirables;
  const tags = req.body.tags;
  const skills = req.body.skills;

  // All tags to lowercase
  tags = tags.map(t => t.toLowerCase());

  var oproject = new Oproject({
    title,
    description,
    userid, // User's ObjectID
    status,
    highlights,
    tags,
    skills,
    desirables,
  });

  console.log("New Project: \n" + oproject);

  oproject.save().then((newDoc) => {
    // For every Skill & Tag, if not existing create new, else add the projectId reference.

    async.parallel(
      // save Skills and Tags to database in parallelized fashion
      {
        tags: async function (callback) {
          const oprojects = [newDoc._id];
          for (let i = 0; i < newDoc.tags.length; i++) {
            // iterate over the project's tags array
            const tagName = newDoc.tags[i];
            let tag = await Tag.findOne({ name: tagName });
            if (!tag) {
              tag = new Tag({
                name: tagName,
                oprojects,
              });

              tag.save(callback);
            } else {
              // update Mongoose tags oprojects
              console.log(tag);
              console.log("New doc id:" + newDoc._id);
              tag.oprojects.push(newDoc._id);
              tag.save(callback);
            }
            // save new tags and  update existing ones
          }
        },

        skills: async function (callback) {
          // save new skills and update existing ones.
          const oprojects = [newDoc._id];
          for (let i = 0; i < newDoc.skills.length; i++) {
            // iterate over the project's skills array
            const skillName = newDoc.skills[i];
            let skill = await Skill.findOne({ name: skillName });
            if (!skill) {
              skill = new Skill({
                name: skillName,
                oprojects,
              });

              skill.save(callback);
            } else {
              // update Mongoose skill's oprojects
              console.log(skill);
              console.log("New doc id:" + newDoc._id);
              skill.oprojects.push(newDoc._id);
              skill.save(callback);
            }
            // save new tags and  update existing ones
          }
        },
      },
      function (err, results) {
        console.log("Callback running");
        // objeto con atributos tags, skills, que incluyen los resultados
        if (err) {
          res.status(500).json("Error" + err);
        }
        console.log("Callback finished succesfully");
        console.log("New doc's id:", newDoc._id);
        res.json(newDoc._id);
      }
    );
  });
};

exports.getAll = function (req, res) {
  Oproject.find()
    .populate("userid")
    .then((projects) => res.json(projects))
    .catch((err) => res.status(500).json("Error: " + err));
};

exports.update = function (req, res) {
  res.send("Updating a project..." + req.params.id);
};

exports.delete = function (req, res) {
  console.log("Deleting by id: " + req.params.id);

  Oproject.findOneAndDelete({ _id: req.params.id })
    .then((deletedDoc) => {
      res.send("Deleted succesfully: " + deletedDoc);
    })
    .catch((err) => {
      res.status(500).json("Error:" + err);
    });
};

exports.deleteClosed = function (req, res) {
  Oproject.deleteMany({ status: "Closed" })
    .then(function () {
      res.send("Data deleted"); // Success
    })
    .catch(function (error) {
      res.send(error); // Failure
    });
};


exports.getOne = function (req, res) {
  console.log("Get One Oproject!");
  Oproject.findById(req.params.id).populate('userid')
    .then((oproject) => {

      let visitorIsOwner = false;
      const response = {
        project: oproject,
        isOwner: visitorIsOwner,
      };
      res.json(response);
    })
    .catch((err) => res.status(500).json("Error: " + err));
};

// LEGACY
exports.getByUser = function (req, res) {
  // TODO: refactor for Firebase Auth
  Oproject.find({ userid: mongoose.Types.ObjectId(req.params.userid) })
    .then((projects) => res.json(projects))
    .catch((err) => res.status(500).json("Error" + err));
};


/*
EXAMPLE OPROJECT
{
  "title": "Geeb Project",
  "description": "A long-term independent networking project made with the MERN stack",
  "highlights": ["No highlights yet"],
  "tags": ["MERN", "Web App"],
  "skills": ["Fullstack developer"],
  "desirables": ["Likes programming!"]
}
*/