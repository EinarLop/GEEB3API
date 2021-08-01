const email = require("../controllers/emailController.js");
const express = require("express");
const router = express.Router();

router.use("/", email.test);

module.exports = router;
