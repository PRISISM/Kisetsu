// Filter that formats the count of ratings

(function()
{angular
	.module('kisetsuApp')
	.filter('formatCount', formatCount);

	function formatCount () {
		return function(ratings) {

			if (ratings === "") {
				return 'No Ratings';
			}

			else if (ratings.length === 1) {
				return (ratings.length) + ' Rating';
			}

			else {
				return (ratings.length) + ' Ratings';
			}

		};

	} })();