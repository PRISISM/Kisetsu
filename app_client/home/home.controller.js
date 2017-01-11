angular
	.module('kisetsuApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl (anidata, ratings) {

	// Set up helper function for last element in array - direct access is fast
	if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    	};
	}

	var vm = this;
	vm.title = "Winter 2017";

	var dataPromise = anidata.getData();

	dataPromise.then(function(result) {
		vm.anime = result.data;
	});

	vm.rateAnime = function(id, name, airing_data) {
		$(document).ready(function() {
		    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
		});

		// If cookie exists
		if (Cookies.get(id.toString()) !== undefined) {
			swal({
				title: 'Woah! You\'ve already rated this!',
				text: 'Sorry, please return in ' + remainingTime(airing_data.time) + ' when the next episode airs!',
				type: 'warning',
				timer: 5000
			}).then(function () {
				return;
			});
		}
		else{

			swal({
				title: 'Rating',
				text: 'What did you think about ' + name + ' this week?',
				type: 'question',
				confirmButtonText: 'Continue <i class="fa fa-arrow-right></i>',
				showCloseButton: true,
				showLoaderOnConfirm: true,
				allowOutsideClick: false,
				input: 'radio',
				inputOptions: {
					1: '<i class="material-icons md-48" data-toggle="tooltip" title="Hated it!">sentiment_very_dissatisfied</i>',
					2: '<i class="material-icons md-48" data-toggle="tooltip" title="It was pretty bad.">sentiment_dissatisfied</i>',
					3: '<i class="material-icons md-48" data-toggle="tooltip" title="It was okay.">sentiment_neutral</i>',
					4: '<i class="material-icons md-48" data-toggle="tooltip" title="It was good.">sentiment_satisfied</i>',
					5: '<i class="material-icons md-48" data-toggle="tooltip" title="Loved it!">sentiment_very_satisfied</i>'
				},
				inputValidator: function (result) {
					return new Promise(function( resolve, reject){
						if (result) {
							resolve();
						}
						else {
							reject('You need to select a rating!');
						}
					});
				},
				preConfirm: function(radio) {
					return new Promise(function ( resolve, reject) {
						var myPromise = ratings.postRating(id, radio);
						myPromise.then(function(result) {
							resolve(result);
						});
					});
				}

			}).then(function (result) {
				var s = remainingTime(airing_data.time);

				// Set cookie for anime
				Cookies.set(result.animeId, result.ratings.last(), {expires : new Date(airing_data.time) });

				swal({
					type: 'success',
					text: 'Rating submitted! Please come back in ' + s + ' when the next episode airs!'
				});

			});
		}
	};

	var remainingTime = function(airing_time) {
		// Calculate HH:mm:ss remaining
		
		nowTime = moment(Date.now()).format("DD/MM/YYYY HH:mm:ss");
		nextEpTime = moment(airing_time).format("DD/MM/YYYY HH:mm:ss");

		var ms = moment(nextEpTime, "DD/MM/YYYY HH:mm:ss").diff(moment(nowTime, "DD/MM/YYYY HH:mm:ss"));
		var d = moment.duration(ms);
		var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

		return s;
	};



}