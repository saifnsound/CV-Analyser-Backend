var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var Applicant = require('../models/applicant');

// router.post("/add", (req, res) => {
//     var applicant = {
//         fullName: req.body.fullName,
//         email: req.body.email,
//         mobileNumber: req.body.mobileNumber,
//         location: req.body.mobileNumber,
//         skypeID: req.body.skypeID,
//         githubID: req.body.githubID,
//         linkedinID: req.body.linkedinID,
//         user: {
//             id: req.user._id,
//             username: req.user.username
//         }
//     }

//     Applicant.create(applicant, (err, newlyCreated) => {
//         if (err) {
//             req.send({
//                 message: err.message
//             });
//         } else {
//             res.send({
//                 newlyCreated
//             });
//         }
//     });
// })

module.exports = router;