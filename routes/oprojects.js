// /PROJECTS MODULE FOR VIEWING, MODIFYING S AND O PROJECTS
const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");

// ROUTES FOR OPROJECT
router.post("/create", oproject.create);

router.get("/", oproject.showAll);

router.post("/update/:id", oproject.updateProject);

router.post("/delete/:id", oproject.delete);

router.get("/:id", oproject.getOne);

// ROUTES FOR SPROJECT

module.exports = router;
