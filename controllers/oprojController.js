const Oproject = require("../models/oproject");
const Tag = require("../models/tag");
const Skill = require("../models/skill");
const User = require("../models/user");
const async = require("async");
const mongoose = require("mongoose");
require("dotenv").config();


exports.create = async function (req, res) {

  console.log("Creating an oproject...");
  const {
    title,
    description,
    status,
    highlights,
    desirables,
    tags,
    skills } = req.body;
  /* const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const highlights = req.body.highlights;
  const desirables = req.body.desirables;
  const tags = req.body.tags;
  const skills = req.body.skills; */

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

  var oproject = new Oproject({
    title,
    description,
    userid,
    status,
    highlights,
    skills,
    desirables,
    tags: lowercasetags,
  });

  console.log("New Oproject");
  console.log(oproject);

  oproject
    .save()
    .then((newDoc) => {

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
          if (err) {
            res.status(500).json("Error" + err);
          }
          console.log("Saved Oproject succesfully, results:", results);

          console.log("New doc's id:", newDoc._id);
          res.status(200).json(newDoc);
        }
      );
    });
};

exports.getAll = function (req, res) {
  Oproject.find()
    .populate("userid").sort({ created: 'desc' })
    .then((projects) => res.json(projects))
    .catch((err) => res.status(500).json("Error: " + err));
};

exports.update = function (req, res) {
  res.status(501).send("OProject update not implemented yet")
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
  console.log("Querying project id", req.params.id);
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

// UNUSED 
exports.getByUser = async function (req, res) {
  const { username } = req.params;
  let userid;

  try {
    const userDoc = await User.findOne({ username: username }, '_id');
    if (!userDoc) {
      res.status(404).json("No MongoId found for username", username);
    }
    userid = mongoose.Types.ObjectId(userDoc['_id']);;

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

  Oproject.find({ userid: userid })
    .then((projects) => res.status(200).json(projects))
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
  "desirables": ["Likes programming!", "Is in the last semesters"]
}
*/