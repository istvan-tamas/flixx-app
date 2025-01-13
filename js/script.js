const state = {
	currentPage: window.location.pathname,
};

async function displayPopMovies() {
	const { results } = await fetchAPIData('movie/popular');
	results.forEach((movie) => {
		const movieCard = document.createElement('div');
		movieCard.classList.add('card');
		movieCard.innerHTML = `
					<a href="movie-details.html?id=${movie.id}">
    ${
			movie.poster_path
				? `<img
							src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
							class="card-img-top"
							alt="${movie.title}"
						/>`
				: `<img
							src="images/no-image.jpg"
							class="card-img-top"
							alt="${movie.title}"
						/>`
		}
					</a>
					<div class="card-body">
						<h5 class="card-title">${movie.title}</h5>
						<p class="card-text">
							<small class="text-muted">Release: ${movie.release_date}</small>
						</p>
					</div>
				`;
		document.querySelector('#popular-movies').appendChild(movieCard);
	});
}

async function fetchAPIData(endpoint) {
	const API_KEY = '6dd66f7277fc9eb98e90301a5073dbfe';
	const API_URL = 'https://api.themoviedb.org/3/';

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=hu-HU`
	);

	const data = await response.json();
	return data;
}

highLightLink = () => {
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach((link) => {
		if (link.getAttribute('href') === state.currentPage) {
			link.classList.add('active');
		}
	});
};

init = () => {
	switch (state.currentPage) {
		case '/':
		case '/index.html':
			displayPopMovies();
			console.log('home');
			break;
		case '/shows.html':
			console.log('shows');
			break;
		case '/movie-details.html':
			console.log('movie details');
			break;
		case '/tv-details.html':
			console.log('TV details');
			break;
		case '/search.html':
			console.log('search');
			break;
	}

	highLightLink();
};

document.addEventListener('DOMContentLoaded', init);
