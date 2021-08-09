const email = require("../controllers/emailController.js");
const express = require("express");
const router = express.Router();

router.post("/", email.send);

router.post("/applicants", email.getApplicantsInfo);
// router.get("/creator", email.getCreator);

module.exports = router;
