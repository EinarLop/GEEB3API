const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const auth = require("../controllers/auth.js");

/* PREFIX /users/ */

router.get("/mail-query/:username", user.getEmailFromUsername);
router.get("/", user.getAll);
router.get("/private", auth, (req, res) => {
    console.log("Received from Auth credentials:", res.locals.decodedToken.uid); // works!
    res.status(200).json("You're good to go");
});

router.post("/by-email", user.findByEmail);

router.post("/register", user.register);

router.put("/update/:id", auth, user.update);
router.get("/delete/:id", auth, user.delete);


router.get("/:id", user.getOne);

module.exports = router;
