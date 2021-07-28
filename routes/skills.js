const express = require("express");
const router = express.Router();
const skill = require("../controllers/skillController");

//   Prefix     '/skills'
router.post("/create", skill.create);
router.get("/", skill.getAll);

router.patch("/update/:id", skill.update);

router.post("/delete/:id", skill.delete);
router.post("/deleteAll", skill.deleteAll);

router.get("/:id", skill.getOne);

module.exports = router;