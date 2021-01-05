// /PROJECTS MODULE FOR VIEWING, MODIFYING S AND O PROJECTS
const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");
const sproject = require("../controllers/sprojController");
const tag = require("../controllers/tagController");
const skill = require("../controllers/skillController");
const user = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("Welcome to GEEB API");
});

// ROUTES FOR OPROJECT
router.get("/oproject/create", oproject.createForm);

router.post("/oproject/create", oproject.createProject);

router.get("/oproject/:id/update", oproject.updateForm);

router.post("/oproject/:id/update", oproject.updateProject);

router.get("/oproject/:id/delete", oproject.deleteForm);

router.post("/oproject/:id/delete", oproject.deleteProject);

router.get("/oproject/:id", oproject.getDetail);

router.get("/oprojects", oproject.showAll);

// ROUTES FOR SPROJECT
router.get("/sproject/create", sproject.createForm);

router.post("/sproject/create", sproject.createProject);

router.get("/sproject/:id/update", sproject.updateForm);

router.post("/sproject/:id/update", sproject.updateProject);

router.get("/sproject/:id/delete", sproject.deleteForm);

router.post("/sproject/:id/delete", sproject.deleteProject);

router.get("/sproject/:id", sproject.getDetail);

router.get("/sprojects", sproject.getList);

module.exports = router;
