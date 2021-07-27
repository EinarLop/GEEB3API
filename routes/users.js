const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const FirebaseAuth = require("../controllers/auth.js");

/* PREFIX /users/ */

//MVP
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/", user.getAll); // fetch all users data
router.get("/private", FirebaseAuth, (req, res) => {
    res.status(200).send("You're good to go");
});

//Extras
router.put("/update/:id", user.update);
router.get("/delete/:id", user.delete);
router.get("/:id", user.getOne);
// router.get("/test", auth, user.getMine);


module.exports = router;
