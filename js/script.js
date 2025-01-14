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

async function displayTwenty() {
	const { results } = await fetchAPIData('tv/popular');
	results.forEach((show) => {
		const tvCard = document.createElement('div');
		tvCard.classList.add('card');
		tvCard.innerHTML = `
					<a href="tv-details.html?id=${show.id}">
    ${
			show.poster_path
				? `<img
							src="https://image.tmdb.org/t/p/w500${show.poster_path}"
							class="card-img-top"
							alt="${show.name}"
						/>`
				: `<img
							src="images/no-image.jpg"
							class="card-img-top"
							alt="${show.name}"
						/>`
		}
					</a>
					<div class="card-body">
						<h5 class="card-title">${show.name}</h5>
						<p class="card-text">
							<small class="text-muted">Air date: ${show.first_air_date}</small>
						</p>
					</div>
				`;
		document.querySelector('#popular-shows').appendChild(tvCard);
	});
}

async function displayMovieDetails() {
	const movieID = window.location.search.split('=')[1];
	const movie = await fetchAPIData(`movie/${movieID}`);

	displayBackgroundImage('movie', movie.backdrop_path);

	const div = document.createElement('div');
	div.innerHTML = `<div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
				${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
							movie.homepage
						}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>$${addCommasToNumber(
							movie.budget
						)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
							movie.revenue
						)}</li>
            <li><span class="text-secondary">Runtime:</span> ${
							movie.runtime
						} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
					${movie.production_companies
						.map((company) => `<span>${company.name}</span>`)
						.join('')}
		  </div>
        </div>
		`;
	document.querySelector('#movie-details').appendChild(div);
}

displayBackgroundImage = (type, backgroundPath) => {
	const overlayDiv = document.createElement('div');
	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.1';

	if (type == 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
};

async function fetchAPIData(endpoint) {
	const API_KEY = '6dd66f7277fc9eb98e90301a5073dbfe';
	const API_URL = 'https://api.themoviedb.org/3/';

	showSpinner();

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=hu-HU`
	);

	const data = await response.json();
	hideSpinner();
	return data;
}

showSpinner = () => {
	document.querySelector('.spinner').classList.add('show');
};

hideSpinner = () => {
	document.querySelector('.spinner').classList.remove('show');
};

highLightLink = () => {
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach((link) => {
		if (link.getAttribute('href') === state.currentPage) {
			link.classList.add('active');
		}
	});
};

addCommasToNumber = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

init = () => {
	switch (state.currentPage) {
		case '/':
		case '/index.html':
			displayPopMovies();
			console.log('home');
			break;
		case '/shows.html':
			displayTwenty();
			console.log('shows');
			break;
		case '/movie-details.html':
			displayMovieDetails();
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
