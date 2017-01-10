angular
	.module('kisetsuApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl (anidata) {
	var vm = this;
	vm.title = "Winter 2017";

	var dataPromise = anidata.getData();

	dataPromise.then(function(result) {
		vm.anime = result.data;
		// console.log(vm.anime);
	});

	vm.testId = function(id, name) {
		swal({
			title: 'Rating',
			text: 'What did you think about ' + name + ' this week?',
			type: 'question',
			confirmButtonText: 'Go!',
			input: 'radio',
			inputOptions: {
				1: '<i class="material-icons md-48" data-toggle="tooltip" title="It was pretty bad">sentiment_very_dissatisfied</i>',
				2: '<i class="material-icons md-48">sentiment_dissatisfied</i>',
				3: '<i class="material-icons md-48">sentiment_neutral</i>',
				4: '<i class="material-icons md-48">sentiment_satisfied</i>',
				5: '<i class="material-icons md-48">sentiment_very_satisfied</i>'
			}

		});
	};

}