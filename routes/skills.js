const express = require("express");
const router = express.Router();
const tag = require("../controllers/skillController");

// PREFIJO/SKILLS
router.post("/create", skill.create);
router.get("/", skill.getAll);

router.put("/update/:id", skill.update);

router.post("/delete/:id", skill.delete);

router.get("/:id", skill.getOne);
