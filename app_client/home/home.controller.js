angular
	.module('kisetsuApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl (anidata, ratings) {
	var vm = this;
	vm.title = "Winter 2017";

	var dataPromise = anidata.getData();

	dataPromise.then(function(result) {
		vm.anime = result.data;
		// console.log(vm.anime);
	});

	vm.testId = function(id, name) {
		$(document).ready(function() {
		    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
		});
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
					setTimeout(function() {
						ratings.postRating(id, radio);
						resolve();

					}, 4500);
				});
			}

		}).then(function (result) {
			swal({
				type: 'success',
				text: 'Rating submitted!'
			});

		});
	};

	var init = function() {
		$(document).ready(function() {
		    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
		});
	};

}