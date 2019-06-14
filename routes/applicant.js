var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var Applicant = require('../models/applicant');

router.get("/", middleware.isLoggedIn, (req, res) => {
    question.find({
        "author.username": "" + req.user.username + ""
    }, (err, allQuestions) => {
        if (err) {
            console.log(err);
        } else {
            res.render("questions/index", {
                questions: allQuestions
            });
        }
    });
})

module.exports = router;