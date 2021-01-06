// /PROJECTS MODULE FOR VIEWING, MODIFYING S AND O PROJECTS
const express = require("express");
const router = express.Router();

// Require controller modules (callbacks for each data model)
const oproject = require("../controllers/oprojController");

//ROUTES FOR OPROJECT

//MVP
router.post("/create", oproject.create);

router.get("/", oproject.getAll);

router.put("/update/:id", oproject.update);

router.post("delete/:id", oproject.delete);

router.post("/deleteAll", oproject.deleteAll); // DELETE BEFORE DEPLOYING TO PRODUCTION

router.get("/:id", oproject.getOne);

module.exports = router;
