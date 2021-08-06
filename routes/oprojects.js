/*  PREFIXED ROUTES = '/oprojects' */
const express = require("express");
const router = express.Router();

const oproject = require("../controllers/oprojController");
const auth = require('../controllers/auth.js');


/* PUBLIC ROUTES */

router.get("/", oproject.getAll);

// Get all projects of a user id
router.get("/by/:userid", oproject.getByUser);

// Get one project
router.get("/:id", oproject.getOne);

// Update one by Id
router.patch("/update/:id", oproject.update);

// Delete a post
router.post("delete/:id", auth, oproject.delete);


/* PRIVATE ROUTES */

// Create one project
router.post("/create", auth, oproject.create);

// Get my own Oprojects
router.get("/mine", auth, oproject.getMine);

router.post("/deleteAll", oproject.deleteAll);      // TESTING PURPOSES ONLY


module.exports = router;