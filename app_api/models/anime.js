var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

var animeSchema = new mongoose.Schema({
	animeId: {
		type: Number,
		required: true
	},
	year: String,
	season: String,
	ratings: [ratingSchema],
	//include comments here?
	createdOn: {
		type: Date,
		"default": Date.now
	}
});
mongoose.model('Anime', animeSchema);