var express = require('express');
var router = express.Router();

/* Home page GET */
router.get('/', function(req, res) {
  res.redirect('/projects');
});

router.get('/about', function(req, res) {
    res.send('This is the about page. We explain what is GEEB, what it offers, and how you can use it to empower your professional career.')
  });
  

module.exports = router;