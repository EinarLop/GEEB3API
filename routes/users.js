const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

// ROUTES FOR USER
router.get("/user/create", user.registerForm);

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);

router.get("/user/:id/update", user.updateForm);

router.post("/user/:id/update", user.updateUser);

router.get("/user/:id/delete", user.deleteForm);

router.post("/user/:id/delete", user.deleteUser);

router.get("/user/:id", user.getDetail);

router.get("/users", user.getList);

module.exports = router;
