import '../bootstrap/bootstrap-reboot.css';
import '../bootstrap/bootstrap-grid.css';
import '../scss/custom.scss';

// Header scroll behavior
const header = document.querySelector('.header');
const main = document.querySelector('main');

if (header && main) {
	window.addEventListener('scroll', () => {
		const mainTop = main.getBoundingClientRect().top;

		if (mainTop <= 0) {
			header.classList.add('header--fixed');
		} else {
			header.classList.remove('header--fixed');
		}
	});
}

// Mobile menu toggle
const menuToggle = document.querySelector('.header__menu-toggle');
const menu = document.querySelector('.header__menu');

if (menuToggle && menu) {
	menuToggle.addEventListener('click', () => {
		menu.classList.toggle('header__menu--active');
		menuToggle.classList.toggle('header__menu-toggle--active');
	});

	// Close menu when clicking on a menu link
	const menuLinks = menu.querySelectorAll('.header__menu-link');
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('header__menu--active');
			menuToggle.classList.remove('header__menu-toggle--active');
		});
	});
}

import './custom.js';


const mapEl = document.getElementById('map');

if (mapEl) {
	const io = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				import('./leaflet.js').then(({ initMap }) => {
					initMap();
				}).catch(err => console.error('Erro ao carregar mapa:', err));
				observer.disconnect();
			}
		});
	}, { rootMargin: '200px' }); // pré-carrega quando estiver a 200px do map

	io.observe(mapEl);
}