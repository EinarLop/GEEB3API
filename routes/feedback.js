const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");
const FbComment = require("../models/fbcomment");


router.post('/submit', (req, res) => {

    const comment = new FbComment({
        content: req.body.content,
    })

    console.log("New feedback comment:", comment.content);
    comment.save(comment)
    .then(newDoc => {
        console.log("Saved new comment")
        res.json("New doc succesful:" + newDoc)
    })
    .catch(err => {
        console.log("Something went wrong", err);
        res.status(500).json(err)
    })

})


module.exports = router;