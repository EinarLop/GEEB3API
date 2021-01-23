// /PROJECTS MODULE FOR VIEWING, MODIFYING S AND O PROJECTS
const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");

const auth = require('../controllers/auth.js');
//ROUTES FOR OPROJECT

//MVP
router.post("/create", auth, oproject.create);      // create one project

router.get("/", oproject.getAll);       // all projects in feed

// TODO: route for user's personal projects: projects by userId

router.put("/update/:id", oproject.update);         // modify one project

router.post("delete/:id", oproject.delete);         // delete one project

router.get("/:id", oproject.getOne);                // get one project by project Id

router.post("/deleteAll", oproject.deleteAll);      // TESTING. delete 

module.exports = router;
