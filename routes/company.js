var express = require('express');
var User = require("../models/user");
var router = express.Router();
var Company = require('../models/company');

router.get("/info", (req, res) => {
    Company.findOne({
        username: req.user.username
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
    Company.findOneAndUpdate({
        username: req.user.username
    }, {
        $set: {
            name: req.body.name,
            website: req.body.website,
            industry: req.body.industry,
            companySize: req.body.companySize,
            headquarters: req.body.headquarters,
            type: req.body.type,
            founded: req.body.founded,
            specialties: req.body.specialties
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