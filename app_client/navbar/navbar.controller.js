angular
	.module('kisetsuApp')
	.controller('navbarCtrl', navbarCtrl);

function navbarCtrl ($location) {
	var vm = this;

	vm.isActive = function( viewLocation) {
		return viewLocation === $location.path();
	};

}