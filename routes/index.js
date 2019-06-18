var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var middleware = require('../middleware/index');

router.post("/signup", (req, res) => {
	var newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		profileType: req.body.profileType
	});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			res.send(err);
		}
		passport.authenticate("local")(req, res, function () {
			res.send({
				message: 'Registered new user.'
			});
		});
	});
});

router.post("/login", passport.authenticate("local"), function (req, res) {
	User.findOne({
		username: req.user.username
	}, (err, info) => {
		if (err) res.send({
			message: err
		})
		else {
			res.send({
				user: info,
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
		res.send({
			message: "User logged out."
		});
	});

})

module.exports = router;