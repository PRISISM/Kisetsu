angular
	.module('kisetsuApp')
	.controller('rankingCtrl', rankingCtrl)
	.filter('formatZeroes', formatZeroes);

function rankingCtrl (anidata, ratings) {
	var vm = this;

	var dataPromise = anidata.getRanking();

	dataPromise.then(function(result) {
		vm.mergedAnime = result;

	});

}