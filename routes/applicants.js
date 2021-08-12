// TODO: REFACTOR MODULE FOR FIREBASE AUTH
const express = require('express')
const router = express.Router();

const applicant = require('../controllers/applicantController');
const auth = require('../controllers/auth');

/* PREFIJO:    '/applicants'  */

router.get('/', applicant.getAll);    // testing


router.get('/:userid', applicant.getByUser);      // view my applications; requires auth of user

router.get('/project/:oprojectid', applicant.getByProject); //view applications to an oproject

router.post('/create', applicant.create);      // Create Applicant object

// agregar auth middleware
router.post('/delete/:id', applicant.delete);   // cancel an application; requires auth of user

router.post('/deleteAll', applicant.deleteAll);         // solo para testing

// PARA MODIFICAR STATUS (aceptar o rechazar)
router.patch('/update/status/:id', applicant.updateStatus);    // for modifying the status
// PARA MODIFICAR DESCRIPTION (extra) 
router.patch('/update/description/:id', auth, applicant.updateDescription);


module.exports = router;