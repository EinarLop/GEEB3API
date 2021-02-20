const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const auth = require("../controllers/auth.js");

//  Prefix     '/users'

//MVP
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/", user.getAll); // fetch all users data

//Extras
router.put("/update/:id", user.update);         // user id comes in req.body
router.get("/delete/:id", user.delete);
router.get("/:id", user.getOne);
// router.get("/test", auth, user.getMine);

module.exports = router;
