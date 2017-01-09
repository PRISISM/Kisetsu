angular
	.module('kisetsuApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl () {
	var vm = this;
	vm.title = "Seasonal";
}