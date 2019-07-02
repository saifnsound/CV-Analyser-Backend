var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var Applicant = require('../models/applicant');
var Binary = require('mongodb').Binary;
var multer = require('multer');
var fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
}).single('file')


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

router.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        res.status(200).json({
            success: true
        })
    })
})

router.post('/edit', (req, res) => {
    var img = fs.readFileSync(__dirname + '/../public/' + req.body.username + '.pdf');
    console.log(img);
    var encode_image = img.toString('base64');
    Applicant.findOneAndUpdate({
        username: req.body.username
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
            },
            occupation: req.body.occupation,
            type: req.body.type,
            resume: new Buffer(encode_image, 'base64')
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
            search1.username = req.body.username;
            User.findOneAndUpdate(search1, {
                $set: {
                    updatedProfile: true,
                }
            }, (err, updatedUser) => {
                res.send({
                    message: 'Done'
                });
            })
        }
    })
})

module.exports = router;