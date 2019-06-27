var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var Job = require('../models/job');

router.post("/add", (req, res) => {
    var job = {
        postedBy: req.user.username,
        title: req.body.title,
        role: req.body.role,
        location: req.body.location,
        description: req.body.description,
        type: req.body.type,
        stipend: req.body.stipend,
        ctc: req.body.ctc,
        workFromHome: req.body.workFromHome,
        cgpa: req.body.cgpa,
        experience: req.body.experience,
        tnt: req.body.tnt,
        aoe: req.body.aoe,
        languages: req.body.languages,
        priority: req.body.priority
    }
    Job.insertOne(job, (err, addedJob) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
            })
        }
    })

})

module.exports = router;