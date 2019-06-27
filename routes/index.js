var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var middleware = require('../middleware/index');

router.post("/signup", (req, res) => {
	// var obj = JSON.parse(req.body);
	// console.log(req.body);
	var newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		profileType: req.body.profileType
	});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			res.send({
				err,
				success: false
			});
		}
		passport.authenticate("local")(req, res, function () {
			res.send(JSON.stringify({
				success: true
			}));
		});
	});
});

router.post("/login", passport.authenticate("local"), function (req, res) {
	User.findOne({
		username: req.body.username
	}, (err, info) => {
		console.log(err);
		if (err) res.json({
			success: false,
			message: err
		})
		else {
			res.json({
				user: info,
				success: true,
				message: "User logged in."
			})
		}
	})
});

router.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		res.json({
			message: "User logged out."
		});
	});

})

module.exports = router;