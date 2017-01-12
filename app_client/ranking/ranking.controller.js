angular
	.module('kisetsuApp')
	.controller('rankingCtrl', rankingCtrl);

function rankingCtrl (anidata, ratings) {
	var vm = this;

	var dataPromise = anidata.getRanking();

	dataPromise.then(function(result) {
		vm.mergedAnime = result;

	});

}