angular
	.module('kisetsuApp')
	.controller('rankingCtrl', rankingCtrl);

function rankingCtrl (anidata, ratings) {
	var vm = this;

	var dataPromise = anidata.getRanking();

	dataPromise.then(function(result) {
		// var arrays = result;

		// arrays[1] = Object(arrays[1].data);

		// console.log(arrays);

		//rename id field to animeId in 'anime' doc
		vm.mergedAnime = result;
		// vm.mergedAnime = $.extend(true, {}, arrays[1], arrays[0] ); // array of anime sorted by avg score in descending
		// vm.anime = arrays[0];
		// vm.animeRatings = arrays[1];

		console.log(vm.mergedAnime);

	});

}