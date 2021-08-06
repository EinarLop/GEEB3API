const express = require("express");
const router = express.Router();


/* Home page GET */
router.get("/", function (req, res) {
  //res.redirect('/projects');
  res.send("WELCOME TO GEEB3 API");
});

router.get("/about", function (req, res) {
  res.send(
    ```
    This is the about page. We explain what how to use the GEEB3API, what it offers,\n
    And what it can do for you as a developer.
    \n
    URL PATHS:
    \t'about/users' => users tutorial\n
    \t'about/sprojects' => sprojects tutorial\n
    \t'about/oprojects' => oprojects tutorial\n
    \t'about/tags' => tags tutorial\n
    \t'about/skills' => skills tutorial\n
    \t'about/applicants' => applicants tutorial\n
    \t'about/feedback' => feedback comments tutorial\n
    ```
  );
});


module.exports = router;
