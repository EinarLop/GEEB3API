const Sproject = require("../models/sproject");
const Tag = require("../models/tag");
const Skill = require("../models/skill");

// Nombres Geeb Projects
// Cloud provider
// Agregar a repo
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
  res.send("List of all Portfolio projects here");
};

exports.getOne = function (req, res) {
  res.send("List of specific project");
};

exports.delete = function (req, res) {
  res.send("Deleting a project..." + req.params.id);
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
