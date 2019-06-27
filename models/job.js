var mongoose = require("mongoose");

var JobSchema = new mongoose.Schema({
    postedBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        require: true,
        enum: ['I', 'J']
    },
    stipend: {
        type: Number
    },
    ctc: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    workFromHome: {
        type: Boolean,
        required: true
    },
    cgpa: Number,
    experience: Number,
    tnt: String,
    aoe: String,
    languages: String,
    priority: [String]
});

module.exports = mongoose.model("Job", JobSchema);