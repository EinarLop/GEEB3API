const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");

const auth = require('../controllers/auth.js');
//ROUTES FOR OPROJECT
//   Prefix     '/oprojects'


//MVP
router.post("/create", auth, oproject.create);      // create one project

router.get("/", oproject.getAll);       // all projects in feed

router.get("/by/:userid", oproject.getByUser)             // get list of projects by a User id

router.patch("/update/:id", oproject.update);         // modify one project

router.post("delete/:id", oproject.delete);         // delete one project

router.get("/:id", oproject.getOne);                // get one project by project Id

router.post("/deleteAll", oproject.deleteAll);      // TESTING. delete 

module.exports = router;
