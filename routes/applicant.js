var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var Applicant = require('../models/applicant');

router.get("/info", (req, res) => {
    Applicant.findOne({
        email: req.user.username
    }, (err, info) => {
        if (err) res.send({
            message: err
        })
        else {
            res.send(info)
        }
    })
})

router.post("/edit", (req, res) => {
    var search = {};
    search.email = req.user.username;

    Applicant.findOneAndUpdate({
        email: req.user.username
    }, {
        $set: {
            fullName: req.body.fullName,
            mobileNumber: req.body.mobileNumber,
            location: req.body.location,
            skypeID: req.body.skypeID,
            githubID: req.body.githubID,
            linkedinID: req.body.linkedinID,
            programming: {
                codeForces: req.body.codeForces,
                codeChef: req.body.codeChef,
                hackerRank: req.body.hackerRank
            }
        }
    }, {
        upsert: true,
        new: true
    }, (err, updatedInfo) => {
        if (err) {
            res.send({
                message: err
            })
        } else {
            var search1 = {};
            search1.username = req.user.username;
            User.findOneAndUpdate(search1, {
                $set: {
                    updatedProfile: true,
                }
            }, (err, updatedUser) => {
                res.send({
                    updatedInfo,
                    updatedUser
                });
            })
        }
    })

})

module.exports = router;