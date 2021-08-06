/* PREFIX '/tags' */

const express = require("express");
const router = express.Router();
const Tag = require("../controllers/tagController");


// MVP
router.post("/create", Tag.create);
router.get("/", Tag.getAll);
router.get("/oprojects", Tag.getOProjectsWithTags);
router.get("/sprojects", Tag.getSProjectsWithTags);


router.post("/delete/:id", Tag.delete);
router.patch("/update/:id", Tag.update);
router.post("/deleteAll", Tag.deleteAll);


router.get("/:id", Tag.getOne);


module.exports = router;
