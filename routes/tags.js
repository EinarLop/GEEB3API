const express = require("express");
const router = express.Router();
const tag = require("../controllers/tagController");

//   Prefix     '/tags'

// MVP
router.post("/create", tag.create);
router.get("/", tag.getAll);
router.get("/:id", tag.getOne);

// Extras
router.post("/delete/:id", tag.delete);
router.patch("/update/:id", tag.update);
router.post("/deleteAll", tag.deleteAll);
module.exports = router;
