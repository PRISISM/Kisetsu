var request = require('request');
var mongoose = require('mongoose');
require('../models/anime');
var Anime = mongoose.model('Anime');
var Ratings = mongoose.model('Rating');

// Load in dotenv variables if local
if ((process.env.NODE_ENV || 'development') === 'development') {
	require('dotenv').load();
}

/* Function that returns the ENV variables for 'year' and 'season'. Used for controller title.
 */
module.exports.getEnvVar = function(req, res) {
	var year = process.env.year;
	var season = process.env.season;
	res.send({year, season});
};

/* Function to get an access token - no refresh token func yet.
   Also returns the ENV variables for 'year' and 'season' so the client can submit them back.
 */
module.exports.getAccessToken = function(req, res) {
	request({
			url: 'https://anilist.co/api/auth/access_token',
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
				var year = process.env.year;
				var season = process.env.season;

				body = JSON.parse(body); // convert from string to Object form

				res.send({body, year, season});
			}

		});

};

/*
	Function to update database with new rating
 */
module.exports.rateAnime = function(req, res) {
	console.log(req.body);
	var query = {
		animeId: req.body.id
	};

	if (req.body.rating < 0 || req.body.rating > 5) {
		// Restricted values
		res.send({
			'message': 'Rating outside of bounds.'
		});
		return;
	}

	var update = req.body.rating;

	Anime.findOneAndUpdate(query, {
		$push: {
			ratings: update
		},
		$set: {
			year: process.env.year,
			season: process.env.season
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
	Function to retrieve ratings from database.
	Only retrieves Anime that have an averageRating field.
 */

module.exports.retrieveRatings = function(req, res) {
	Anime.find({}).sort({
		'averageRating': 'descending'
	})

	.exec(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
};

/*
	Helper function to get the total number of ratings in the Anime collection
	Used to calculate the weighted average
 */

var totalRatings = function(year, season) {
	Anime.aggregate([
		{"$match" : {year: process.env.year, season: process.env.season}},
		{"$unwind" : "$ratings" },
	    {"$group": {"_id": "$_id", "sum": { "$sum": 1}}},
	    {"$group": {"_id": null, "total_sum": {"$sum": "$sum"}}}
	    // returns {id : null , total_sum : count}
	], function(err, result) {
		if (err) {
			return (err);
		}
		else {
			return result.total_sum;
		}


	});
};


/*
	Helper function to calculate a weighted average
	Takes an array of ratings and then applies a smoothing algorithm to the calculated average.
 */
var weightedAverage = function(nums) {
	var weightingFactor = 1.5;

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

	// Calculations
	var modFactor = Math.pow(weightingFactor, nums.length);
	var modRating = (3/ modFactor)+ (sum * (1 - 1 / modFactor));


	console.log(modRating);



	return modRating;
};

// Test function to apply smoothing to all in database

// Anime.find({averageRating : {$exists: true}}).stream()
// 	.on('data', function(doc) {
// 		console.log(doc);
// 		var ratings = doc.ratings;
// 		var oldAvg = doc.averageRating;

// 		weightingFactor = 1.5

// 		var modFactor = Math.pow(weightingFactor, ratings.length);
// 		var modRating = (3/ modFactor)+ (oldAvg * (1 - 1 / modFactor));

// 		console.log(modRating);


// 		query =  {
// 			animeId : doc.animeId
// 		};

// 		Anime.findOneAndUpdate(query, {
// 			$set: {
// 				averageRating: modRating
// 			},
// 			new: true
// 		}, function(err, docs) {
// 			if (err) {	
// 				console.log(err);
// 			} else {
// 				console.log(docs);
// 			}
// 		});


// 	});

// 	