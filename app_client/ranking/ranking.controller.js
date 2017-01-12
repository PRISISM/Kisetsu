angular
	.module('kisetsuApp')
	.controller('rankingCtrl', rankingCtrl);

function rankingCtrl (anidata, ratings, $filter) {
	var vm = this;

	var formatRating = $filter('formatRating');
	var formatCount = $filter('formatCount');

	var dataPromise = anidata.getRanking();

	dataPromise.then(function(result) {
		vm.mergedAnime = result;
		// console.log(vm.mergedAnime);
	});

}
