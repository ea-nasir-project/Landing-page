import '../bootstrap/bootstrap-reboot.css';
import '../bootstrap/bootstrap-grid.css';
import '../scss/custom.scss';

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