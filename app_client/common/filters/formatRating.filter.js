// Filter that formats average ratings

(function()
{angular
	.module('kisetsuApp')
	.filter('formatRating', formatRating);

	function formatRating () {
		return function(number) {

			if (number === "") {
				return 'N/A';
			}

			else {
				return Math.round(number * 100) / 100;
			}

		};

	} })();