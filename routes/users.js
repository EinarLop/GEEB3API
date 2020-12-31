var express = require('express');
var router = express.Router();


var user = require('../controllers/userController');


router.post('/user/create', user.createUser);

module.exports = router;