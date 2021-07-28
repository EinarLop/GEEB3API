const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const auth = require("../controllers/auth.js");

/* PREFIX /users/ */

//MVP
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/", user.getAll); // fetch all users data
router.get("/private", auth, (req, res) => {
    console.log("Received from Auth credentials:", res.locals.uid);
    res.status(200).send("You're good to go", res.locals.uid);
});


router.put("/update/:id", auth, user.update);
router.get("/delete/:id", auth, user.delete);


router.get("/:id", user.getOne);


module.exports = router;
