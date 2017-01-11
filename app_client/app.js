angular.module('kisetsuApp', ['ngRoute']);

// Module configuration
function config ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			// Update title dynamically? Use dotenv?
			title: 'Winter 2017',
			controller: 'homeCtrl',
			controllerAs: 'vm',
			templateUrl: 'home/home.view.html'
		})

		.when('/ranking', {
			title: 'Rankings',
			controller: 'rankingCtrl',
			controllerAs: 'vm',
			templateUrl: 'ranking/ranking.view.html'
		})

		.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);
}

angular
	.module('kisetsuApp')
	.config(['$routeProvider', '$locationProvider', config])
	// Set title based on view
	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.title = current.$$route.title;
		});

	}]);


