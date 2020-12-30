// /PROJECTS MODULE FOR VIEWING, MODIFYING S AND O PROJECTS
var express = require('express');
var router = express.Router();

// Require controller modules (callbacks for each data model)
var oproject = require('../controllers/oprojController');
var sproject = require('../controllers/sprojController');
var tag = require('../controllers/tagController');
var skill = require('../controllers/skillController');
var user = require('../controllers/userController');



router.get('/', (req, res) => {
    res.send("Welcome to GEEB API");
})

// ROUTES FOR OPEN PROJECT
router.get('/oproject/create', oproject.createForm);

router.post('/oproject/create', oproject.createProject);

router.get('/oproject/:id/update', oproject.updateForm);

router.post('/oproject/:id/update', oproject.updateProject);

router.get('/oproject/:id/delete', oproject.deleteForm);

router.post('/oproject/:id/delete', oproject.deleteProject);

router.get('oproject/:id', oproject.getDetail);

router.get('oprojects', oproject.getList);

module.exports = router;