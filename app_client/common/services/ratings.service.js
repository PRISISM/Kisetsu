// A service defined to post ratings to the API which interfaces with the database

angular
	.module('kisetsuApp')
	.factory('ratings', ratings);

ratings.$inject = ['$http', '$location'];

function ratings($http, $location) {
	// $http post to api 
	return $http.get($location.$$absUrl + 'api/rate').then(function(result) {

	
	
	});
}
