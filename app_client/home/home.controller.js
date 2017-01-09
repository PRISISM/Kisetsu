angular
	.module('kisetsuApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl (anidata) {
	var vm = this;
	vm.title = "Winter 2017";

	var dataPromise = anidata.getData();

	dataPromise.then(function(result) {
		vm.anime = result.data;

	});
}