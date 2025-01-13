const state = {
	currentPage: window.location.pathname,
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
};

document.addEventListener('DOMContentLoaded', init);
