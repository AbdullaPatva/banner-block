/* eslint-disable no-console */
(function ($) {
	'use strict';

	// Trigger form submit
	$('#search-form-filter').on('change', function () {
		const filter = $('#search-form-filter');
		const result = $('.latest-posts-block');
		$.ajax({
			url: filter.attr('action'),
			data: filter.serialize(),
			type: filter.attr('method'),
			success(response) {
				result.html(response);
			},
			error(request, status, error) {
				console.log(request.responseText);
				console.log(error);
				console.log(status);
			},
		}).done(function () {
			console.log('ajax completed');
		});
		console.log(filter.attr('action'));
		console.log(filter.attr('method'));
	});
})();
