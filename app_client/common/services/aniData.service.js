angular
	.module('kisetsuApp')
	.factory('anidata', seasonalData);

seasonalData.$inject = ['$http', '$location'];

function seasonalData($http, $location) {
	// Get JSON list of anime
	// var result = $http.get($location.$$absUrl + 'api/token').then(function successCallback(response) {
	// 	console.log(response);
	// 	return response;
	// });

	var getData = function() {
		// First promise
		return $http.get($location.$$absUrl + 'api/token').then(function(result) {
			data = JSON.parse(result.data);

			// Second promise
			return $http({
				method: 'GET',
				url: 'https://anilist.co/api/browse/anime',
				params: {
					access_token: data.access_token,
					season: 'winter',
					year: '2017',
					full_page: true,
					airing_data: true
				}
			});
		})
		.then(function(browseResult){
			return browseResult;
		});
	};

	return {
		getData: getData
	};

}
