const Tag = require("../models/tag");

// GET actions
exports.getAll = function (req, res) {
  // fecth all tags from db
};

exports.getOne = function (req, res) {
  res.send("Get tag with id: " + req.params.id);
};

// POST actions
exports.create = function (req, res) {
  const name = req.body.name;
  const oprojects = req.body.oprojects;
  const sprojects = req.body.sprojects;

  let tag = new Tag({
    name,
    oprojects,
    sprojects,
  });

  tag
    .save()
    .then(() => res.json("Tag added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.delete = function (req, res) {
  res.send("Delete Tag not implemented");
};

exports.update = function (req, res) {
  res.send("Update Tag not implemented");
};

exports.deleteAll = function (req, res) {
  Tag.deleteMany({ name: { $ne: "a" } })
    .then(function () {
      res.send("Data deleted"); // Success
    })
    .catch(function (error) {
      res.send(error); // Failure
    });
};


exports.getOProjectsWithTags = function (req, res) {
  // Fetch the list of oproject Ids given the tag name
  const tagNames = req.query.tagNames; // array

  // Find the tag with name: tagName
  Tag.find({ name: { $in: tagNames } }).select('oprojects')
    .populate({
      path: 'oprojects',
      populate: {
        path: 'userid',
      }
    })
    .then((results) => {

      let oprojects = []
      console.log("For tag names in", tagNames);

      results.forEach((tagDoc) => {
        let arr = tagDoc['oprojects']

        arr.forEach(oproject => {
          oprojects.push(oproject._doc);
        })
      })

      res.status(200).json(oprojects);

    }).catch(error => {
      console.log(error);
      res.status(500).json(error);
    });

}

exports.getSProjectsWithTags = function (req, res) {
  // Fetch the list of oproject Ids given the tag name
  const tagNames = req.query.tagNames; // array

  // Find the tag with name: tagName
  Tag.find({ name: { $in: tagNames } }).select('sprojects')
    .populate({
      path: 'sprojects',
      populate: {
        path: 'userid',
      }
    })
    .then((results) => {

      let sprojects = []
      console.log("For tag names in", tagNames);


      results.forEach((doc) => {
        let arr = doc['sprojects']
        arr.forEach(sproject => {
          sprojects.push(sproject._doc);
        })
      })

      res.status(200).json(sprojects);

    }).catch(error => {
      console.log(error);
      res.status(500).json(error);
    });

}