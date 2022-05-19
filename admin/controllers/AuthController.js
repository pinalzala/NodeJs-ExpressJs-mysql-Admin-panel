const config = require('../config.json');
var request = require('request');
var authenticator = require('authenticator');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var base=config.base;
var urlapi=config.url;
var googleauthkey= 'XVQ2UIGO75XRUKJO';
var validator = require('express-validator');
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);



// Mock GET request to /users when param `searchText` is 'John'

module.exports = function (app, appExpress) {

	// Inner Auth
	app.get('/pages-login', function (req, res) {
		res.locals = { title: 'Login' };
		res.render('AuthInner/pages-login');
	});

	app.get('/login', function (req, res) {
		var options = {
			'method': 'POST',
			'url': urlapi+'/register',
			'headers': {
			  'Content-Type': 'application/json',
			  'Cookie': 'refreshToken=f29c019c3f1654b1d5a4ae04fd610b5f41711384e56809ee2e5ef4bd0ccc497c919bef0998a8c3d4'
			},
			
			body: JSON.stringify({"firstname":"node","lastname":"admin","email":"nodeadmin@vginfotec.com","username":"nodeadmin","password":"Nodeadmin123","status":"1"})
		  
		  };
		  request(options, function (error, response) {
			res.render('Auth/auth-login', { 'message': req.flash('message'), 'error': req.flash('error') });

		});
	});
	// app.get('/authcode', function (req, res) {
	// 	var ses = req.query.ses;
	// 	res.render('Auth/auth-code', {base:base,'message': req.flash('message'), 'error': req.flash('error'), ses:ses });
	// });
	app.post('/post-code', urlencodeParser, function (req, res) {
		var formattedKey = googleauthkey;
      var formattedToken = authenticator.generateToken(formattedKey);
	var code = req.body.code
	   if(formattedToken == formattedToken)
	   {
		   console.log(req.body.ses);
		sess = req.session;
		sess.user = req.body.ses;
		res.redirect(base+'/');
	   }
	   else
	   {
		sess = req.session;
		sess.user = null;
		req.flash('error', 'Passcode Wrong!!!');
		res.redirect(base+'/authcode');
		app.get('/authcode', function (req, res) {
			console.log(req.body.ses);
			res.render('Auth/auth-code', {base:base,'message': req.flash('message'), 'error': req.flash('error'), ses:req.body.ses });
		});
	   }
	});
	app.post('/post-login', urlencodeParser, function (req, res) {
	
		if(req.body.captch === req.body.captchtext)
		{
			var options = {
				'method': 'POST',
				'url': urlapi+'/addlogin',
				'body': JSON.stringify({
					username:req.body.email,
					password: req.body.password
				  }),
				'headers': {
				  'Content-Type': 'application/json',
				  'Cookie': 'refreshToken=f29c019c3f1654b1d5a4ae04fd610b5f41711384e56809ee2e5ef4bd0ccc497c919bef0998a8c3d4'
				},
				
				
				
				};
				request(options, function (error, response) {
				if (error) throw new Error(error);
				var data=JSON.parse(response.body);
				console.log('data',data)
				if(data.status=='success')
				{
					let users = [
						{ id: 1, username: data.datam.username, password: data.datam.password, email: data.datam.email }
					];
					req.body.email=data.datam.email;
					req.body.email=data.datam.password
					const validUser = data.datam;
				}
                
			if (data.status=='success') {

				// Assign value in session
				 sess = req.session;
				 sess.user = data.datam;
	
				 res.redirect(base+'/');
				
	
			} else {
				req.flash('error', 'Incorrect email or password!');
				res.redirect(base+'/login');
			}
		});
	}
		else {
			req.flash('error', 'Enter correct Captcha!');
			res.redirect(base+'/login');
		}
	});

	

	app.get('/logout', function (req, res) {

		// Assign  null value in session
		sess = req.session;
		sess.user = null;

		res.redirect(base+'/login');
	});

	appExpress.use(base, app);


};