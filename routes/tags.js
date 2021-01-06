const express = require("express");
const router = express.Router();
const tag = require("../controllers/tagController");

// PREFIJO TAGS

// MVP
router.post("/create", tag.create);
router.get("/", tag.getAll);
router.get("/:id", tag.getOne);

// Extras
router.post("/delete/:id", tag.delete);
router.put("/update/:id", tag.update);
router.post("/deleteAll", tag.deleteAll);
module.exports = router;
