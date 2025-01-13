const state = {
	currentPage: window.location.pathname,
};

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
