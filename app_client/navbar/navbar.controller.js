(function() {
angular
	.module('kisetsuApp')
	.controller('navbarCtrl', navbarCtrl);

navbarCtrl.$inject = ['$location'];

function navbarCtrl ($location) {
	var vm = this;

	vm.isActive = function( viewLocation) {
		return viewLocation === $location.path();
	};

}
})();