const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");
const sproject = require("../controllers/sprojController");

const skill = require("../controllers/skillController");

/* Home page GET */
router.get("/", function (req, res) {
  //res.redirect('/projects');
  res.send("WELCOME TO GEEB3 API");
});

router.get("/about", function (req, res) {
  res.send(
    "This is the about page. We explain what is GEEB, what it offers, and how you can use it to empower your professional career."
  );
});

// ROUTES FOR TAG AND SKILL CRUD

// get tag create

// get skill create

// get tag update form
// post tag update
// get skill update form
// post skill update

// get tag delete form
// post tag delete
// get skill delete form
// post skill delete

router.get("/tags", tag.getList);

router.get("/tag/:id", tag.getDetail);

router.get("/skills", skill.getList);

router.get("/skill/:id", skill.getDetail);

module.exports = router;
