const express = require("express");
const router = express.Router();

const sproject = require("../controllers/sprojController");

router.put("/create", sproject.create); // change to put as a test, to avoid duplication of skills

router.put("/update/:id", sproject.update);

router.post("/delete/:id", sproject.delete);
router.post("/deleteall", sproject.deleteAll);

router.get("/:id", sproject.getOne);

router.get("/", sproject.getAll);

module.exports = router;
