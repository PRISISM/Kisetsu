var request = require('request');
var mongoose = require('mongoose');
require('../models/anime');
var Anime = mongoose.model('Anime');
var Ratings = mongoose.model('Rating');

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
			if (err) {
				return err;
			} else {
				console.log(body);
				res.json(body);
			}

		});

};

/*
	Function to query database 
 */
module.exports.rateAnime = function(req, res) {
	console.log(req.body);
	var query = {
		animeId: req.body.id
	};

	if (req.body.rating < 0 || req.body.rating > 5) {
		// Restricted values
		res.send({'message' : 'Rating outside of bounds.'});
		return;
	}

	var update = req.body.rating;

	Anime.findOneAndUpdate(query, {
		$push: {
			ratings: update
		}
	}, {
		upsert: true, // Creates Anime if it doesn't exist
		new: true // Return the updated document
	}, function(err, data) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			var avg = weightedAverage(data.ratings);
			console.log('Avg:', avg);

			Anime.findOneAndUpdate(query, {
				$set: {
					averageRating: avg
				},
				new: true
			}, function(err, docs) {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					console.log(docs);
					res.json(docs);
				}
			});

		}
	});

};

/*
	Helper function to calculate a weighted average
 */
var weightedAverage = function(nums) {
	var counts = {};
	nums.forEach(function(x) {
		counts[x] = (counts[x] || 0) + 1;
	});

	var sum = 0;

	for (var i in counts) {
		sum += (i * counts[i]);
	}

	var numVotes = Object.values(counts).reduce(function(a, b) {
		return a + b;
	}, 0);


	sum = sum / numVotes;
	return sum;
};