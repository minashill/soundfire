var express = require('express');
var router = express.Router();
var users = require("../models/usersmodel.js");
const expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');
var Sequelize = require("sequelize");




/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.user);
	console.log(req.isAuthenticated());
	res.render('home'/*, { title: 'Sign Up' }*/);
});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Sign Up' });
});

router.post('/register', function(req, res, next) {

	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
	// req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('confirm', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody('confirm', 'Passwords do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		console.log(`errors: ${JSON.stringify(errors)}`);
		res.render('register', { 
			title: 'Registration Error',
			errors: errors
		});
	} else {
		// const db = require('../db.js');
// bcrypt.hash(password, saltRounds, function(err, hash) {
	users.beforeCreate((user, options) => {

		return bcrypt.hash(user.password, 10)
		.then(hash => {
			user.password = hash;
		})
		.catch(err => { 
			throw new Error(); 
		});
	});
	users.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password
	}).then(function(user) {
		var newUser = user.get({plain: true});
		req.login(newUser.id, function(err) {
			if (err) throw err;
			res.render('register', { title: 'Sign up Complete!', user: newUser});
			 res.redirect('/');
		});

	});

// });
}
});
passport.serializeUser(function(newUser, done) {
  done(null, newUser);
});

passport.deserializeUser(function(newUser, done) {
    done(null, newUser);
  });


module.exports = router;
