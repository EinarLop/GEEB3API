const express = require("express");
const router = express.Router();
const tag = require("../controllers/skillController");

// PREFIJO/SKILLS
router.post("/create", skill.create);
router.get("/", skill.getAll);

router.put("/update/:id", skill.update);

router.post("/update/:id", oproject.update);

router.post("/delete/:id", oproject.delete);

router.get("/:id", oproject.getOne);
