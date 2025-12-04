import '../bootstrap/bootstrap-reboot.css';
import '../bootstrap/bootstrap-grid.css';
import '../scss/custom.scss';

// Header scroll behavior
const header = document.querySelector('.header');
const main = document.querySelector('main');

if (header && main) {
	window.addEventListener('scroll', () => {
		const mainTop = main.getBoundingClientRect().top;

		if (mainTop + 200 <= 0) {
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

	// Mobile dropdown toggle
	const dropdownLink = document.querySelector('.header__menu-link--dropdown');
	const dropdown = document.querySelector('.header__dropdown');

	if (dropdownLink && dropdown) {
		dropdownLink.addEventListener('click', (e) => {
			// Only toggle on mobile (when menu toggle is visible)
			if (window.innerWidth <= 768) {
				e.preventDefault();
				dropdown.classList.toggle('active');
			}
		});
	}

	// Close menu when clicking on a menu link (except dropdown parent)
	const menuLinks = menu.querySelectorAll('.header__menu-link:not(.header__menu-link--dropdown)');
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('header__menu--active');
			menuToggle.classList.remove('header__menu-toggle--active');
		});
	});

	// Close menu when clicking on dropdown links
	const dropdownLinks = menu.querySelectorAll('.header__dropdown-link');
	dropdownLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('header__menu--active');
			menuToggle.classList.remove('header__menu-toggle--active');
			if (dropdown) {
				dropdown.classList.remove('active');
			}
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