var mongoose = require("mongoose");

var ApplicantSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
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
        HackerRank: {
            type: String
        }
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Applicant", ApplicantSchema);