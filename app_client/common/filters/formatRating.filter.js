// Filter that formats 

angular
	.module('kisetsuApp')
	.filter('formatRating', formatRating);

	function formatRating () {
		return function(number) {

			if (number === 0.00) {
				return 'N/A';
			}

			else {
				return Math.round(number * 100) / 100;
			}

		};

	} 