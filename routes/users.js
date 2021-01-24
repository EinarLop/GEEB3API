const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

//  Prefix     '/users'

//MVP
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/", user.getAll); // fetch all users data

//Extras
router.put("/update/:id", user.update);     // could also use patch
router.get("/delete/:id", user.delete);
router.get("/:id", user.getOne);

module.exports = router;
