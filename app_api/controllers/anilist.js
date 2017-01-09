var request = require('request');
var mongoose = require('mongoose');
require('../models/anime');
var Anime = mongoose.model('Anime');

// Load in dotenv variables if local
if ((process.env.NODE_ENV || 'development') === 'development') {
	require('dotenv').load();
}

/* Function to get an access token - no refresh token func yet.
 */
module.exports.getAccessToken = function(req, res) {
	request({
		url: 'http://anilist.co/api/auth/access_token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			client_id: process.env.client_id,
			client_secret: process.env.client_secret,
			grant_type: 'client_credentials'
		}

	},
	function(err, response, body) {
		if(err) {
			return err;
		}
		else {
			console.log(body);
			res.json(body);
		}

	});

};
