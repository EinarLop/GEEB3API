const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");
const auth = require('../controllers/auth.js');

//   Prefix     '/oprojects'

//MVP
router.post("/create", auth, oproject.create);      // create one project

router.get("/", oproject.getAll);       // all projects in feed

router.get("/by/:userid", oproject.getByUser);             // get list of projects by a User id

router.get("/mine", auth, oproject.getMine);            // view my portfolio list

router.patch("/update/:id", oproject.update);         // modify one project

router.post("delete/:id", auth, oproject.delete);         // delete one project

router.get("/:id", oproject.getOne);                // get one project by project Id

router.post("/deleteAll", oproject.deleteAll);      // TESTING. delete 

module.exports = router;
