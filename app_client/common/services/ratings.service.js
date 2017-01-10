// A service defined to post ratings to the API which interfaces with the database

angular
	.module('kisetsuApp')
	.factory('ratings', ratings);

ratings.$inject = ['$http', '$location'];

function ratings($http, $location) {

	var postRating = function(id, rating) {
		console.log(id, rating);

		// // $http post to api 
		return $http({
			method: 'POST',
			url: $location.$$absUrl + 'api/rate',
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
    		},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data : {
				id : parseInt(id),
				rating: rating
			}
		});



	};

	return {
		postRating : postRating
	};


}
