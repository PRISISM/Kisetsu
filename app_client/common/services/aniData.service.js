// A service to retrieve data from the wrapper API defined in /app_api
(function() {
angular
	.module('kisetsuApp')
	.factory('anidata', seasonalData);

seasonalData.$inject = ['$http', '$location'];

function seasonalData($http, $location) {
	
	// Just get environment variables
	var getEnv = function() {
		return $http.get( $location.protocol() + '://' + location.host + '/api/envvar').then(function(result) {
			return result;

		});
	};

	// Get JSON list of anime
	var getData = function() {
		// First promise
		return $http.get( $location.protocol() + '://' + location.host + '/api/token').then(function(result) {
			// console.log(result);

			data = result.data.body;
			year = result.data.year;
			season = result.data.season;

			// Second promise
			return $http({
				method: 'GET',
				url: 'https://anilist.co/api/browse/anime',
				params: {
					access_token: data.access_token,
					season: season,
					year: year,
					//temp
					// type: 'tv',
					sort: 'title_romaji',
					full_page: true,
					airing_data: true
				}
			});
		})
		.then(function(browseResult){
			return browseResult;
		});
	};

	var getRanking = function() {
		var dataPromise = getData();

		return dataPromise.then(function(result) {
			anime = result.data;

			return $http({
				method: 'GET',
				url: $location.protocol() + '://' + location.host + '/api/avg'
			}).then(function (avgResult) {	
				var i;

				//rename id field to animeId in 'anime' doc
				for(i = 0; i < avgResult.data.length; i++){
				    avgResult.data[i].id = avgResult.data[i].animeId;
				    delete avgResult.data[i].animeId;
				}

				mergedAnime =  new jinqJs().from(anime).leftJoin(avgResult.data).on('id').select();

				// sort by average rating
				mergedAnime.sort(function(a, b) {
					return (parseFloat(a.averageRating) || 0) - (parseFloat(b.averageRating) || 0);
				}).reverse();

				return mergedAnime;
			});

		});

	};

	return {
		getEnv: getEnv,
		getData: getData,
		getRanking: getRanking
	};

}
})();