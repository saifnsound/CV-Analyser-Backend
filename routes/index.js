var express = require('express');
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
var middleware = require('../middleware/index');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send("hello");
});

router.post("/signup", (req, res) => {
	var newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username
	});
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			res.json(err);
		}
		passport.authenticate("local")(req, res, function () {
			res.send("Registered User");
		});
	});
});

router.post("/login", passport.authenticate("local"), function (req, res) {
	console.log(req.user.username);
});

router.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy(function (err) {
		if (err) {
			return next(err);
		}
		res.send("User logged out!");
	});

})

module.exports = router;