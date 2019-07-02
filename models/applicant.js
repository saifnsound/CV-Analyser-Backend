var mongoose = require("mongoose");

var ApplicantSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    skypeID: {
        type: String,
        required: true
    },
    githubID: {
        type: String
    },
    linkedinID: {
        type: String
    },
    programming: {
        codeForces: {
            type: String
        },
        codeChef: {
            type: String
        },
        hackerRank: {
            type: String
        }
    },
    occupation: String,
    type: String,
    resume: {
        type: Object,
        required: true
    },
    username: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model("Applicant", ApplicantSchema);