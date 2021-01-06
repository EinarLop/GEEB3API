const express = require("express");
const router = express.Router();

const sproject = require("../controllers/sprojController");

router.post("/create", sproject.create);

router.put("/update/:id", sproject.update);

router.post("/delete/:id", sproject.delete);

router.get("/:id", sproject.getOne);

router.get("/", sproject.getAll);
