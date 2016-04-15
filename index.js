$( function() {

	var $tvShowsContainer = $('#app-body').find('.tv-shows');

	// Render shows
	function renderShows(shows) {
		$tvShowsContainer.find('#loader').remove();
		shows.forEach(function (show) {
			var article = template
				.replace(':nombre:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':descripcion:', show.summary)
				.replace(':nombre img:', show.name)

				var $article = $(article)
				$tvShowsContainer.append($article)
		})
	}

	// Submit search form
	$('#app-body')
		.find('form')
		.submit(function onsubmit (ev) {
			ev.preventDefault();
			var busqueda = $(this)
				.find('input[type="text"]')
				.val();
			console.log($(this));
			$.ajax({
				url: 'http://api.tvmaze.com/search/shows',
				data: { q: busqueda},
				success: function (res, textStatus, xhr) {
					$tvShowsContainer.find('.tv-show').remove();
					var shows = res.map( function (el) {
							return el.show;
					})
					renderShows(shows);
				}
			})
	})

	var template = '<article class="tv-show">' +
						'<div class="left img-container">' +
							'<img src=":img:" alt=":nombre img:">' +
						'</div>' +
						'<div class="info right">' +
							'<h1>:nombre:</h1>' +
							'<p>:descripcion:</p>' +
						'</div>'
					'</article>';

	if(!localStorage.shows) {	
		$.ajax('http://api.tvmaze.com/shows')
		 .then(function(shows) {
				localStorage.shows = JSON.stringify(shows);
				renderShows(shows);
			})
	} else {
		renderShows(JSON.parse(localStorage.shows));
	}

})
