const express = require('express')
const router = express.Router();

const applicant = require('../controllers/applicantController');
const auth = require('../controllers/auth');

// PREFIJO:    /applicants  
router.get('/', applicant.getAll);    // solo para testing

// agregar auth middleware
router.get('/:userid', applicant.getByUser);      // view my applications; requires auth of user

router.get('/project/:oprojectid', applicant.getByProject); //view appliactions of a project

router.post('/create', applicant.create);      // Create Applicant object
// all info is passed via req.body json


// agregar auth middleware
router.post('/delete/:id', applicant.delete);   // cancel an application; requires auth of user

router.post('/deleteAll', applicant.deleteAll);         // solo para testing

// PARA MODIFICAR STATUS (aceptar o rechazar)
router.patch('/update/status/:id', applicant.updateStatus);    // for modifying the status
// PARA MODIFICAR DESCRIPTION (extra) 
router.patch('/update/description/:id', auth, applicant.updateDescription);


module.exports = router;