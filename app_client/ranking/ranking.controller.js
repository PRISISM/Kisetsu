(function() {
angular
	.module('kisetsuApp')
	.controller('rankingCtrl', rankingCtrl);

rankingCtrl.$inject = ['anidata', 'ratings', '$filter'];

function rankingCtrl (anidata, ratings, $filter) {
	var vm = this;

	var formatRating = $filter('formatRating');
	var formatCount = $filter('formatCount');

	// Set up helper function for filtering array of anime 
	function filterByType(item) {
		if (item.type === 'TV' || item.type === 'TV Short') {
			return true;
		} else {
			return false;
		}
	}

	// Anime data promise and setup
	var dataPromise = anidata.getRanking();

	dataPromise.then(function(result) {
		vm.mergedAnime = result.filter(filterByType);
	});

}
})();