const Oproject = require("../models/oproject");
const Tag = require("../models/tag");
const Skill = require("../models/skill");
const async = require("async");

// Route callback definitions

// GET actions

// information for the object comes in req.body if we're using json
exports.create = function (req, res) {
  // const version = req.body.version;
  const title = req.body.title;
  const description = req.body.description;
  //const userid = req.body.userid
  const status = req.body.status;
  const highlights = req.body.highlights;
  const tags = req.body.tags;
  const skills = req.body.skills;

  var oproject = new Oproject({
    version: 0.1,
    title,
    description,
    //userid: '',
    status,
    highlights,
    tags,
    skills,
  });
  oproject.save().then((newDoc) => {
    // use the given Sproject Tags and Skills to either create them or add the reference.
    async.parallel(
      {
        tags: async function (callback) {
          const oprojects = [newDoc._id];
          for (let i = 0; i < newDoc.tags.length; i++) {
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
            const skillName = newDoc.skills[i];
            let skill = await Tag.findOne({ name: skillName });
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
          res.status(400).json("Error" + err);
        }
        res.send("Created succesfully: " + results);
      }
    );
  });
};

exports.getAll = function (req, res) {
  Oproject.find()
    .then((oproject) => res.json(oproject))
    .catch((err) => res.status(400).json("Error: " + err));
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

exports.deleteAll = function (req, res) {
  Oproject.deleteMany({ status: "Open" })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

exports.getOne = function (req, res) {
  res.send("Deleting a project...");
};
