var mongoose = require("mongoose");

var CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        require: true
    },
    companySize: {
        type: Number,
    },
    headquarters: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['Public', 'Private'],
        require: true
    },
    founded: {
        type: String
    },
    Specialties: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
});

module.exports = mongoose.model("Company", CompanySchema);