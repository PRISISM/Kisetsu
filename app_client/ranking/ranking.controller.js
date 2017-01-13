(function() {
angular
	.module('kisetsuApp')
	.controller('rankingCtrl', rankingCtrl);

rankingCtrl.$inject = ['anidata', 'ratings', '$filter'];

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
})();