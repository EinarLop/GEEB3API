const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

// ROUTES FOR USER

//MVP
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/", user.getAll); // fetch all users data

//Extras
router.post("/update/:id", user.updateUser);
router.get("/delete/:id", user.deleteForm);
router.get("/:id", user.getProfile);

module.exports = router;
