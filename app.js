const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(2000);