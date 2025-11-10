// importa Leaflet e seu CSS via bundler
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import partnerIconUrl from '../images/renova-pin.svg';

export function initMap() {
    const el = document.getElementById('map');
    if (!el) return;

    const map = L.map('map', { attributionControl: true }).setView([-23.5505, -46.6333], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    const partnerIcon = L.icon({
        iconUrl: partnerIconUrl,
        iconSize: [50, 50],
        iconAnchor: [20, 40],
        popupAnchor: [0, -36]
    });

    const markers = [
        L.marker([-23.63169690005687, -46.78373366260535], { icon: partnerIcon })
            .addTo(map)
            .bindPopup('<b><span class="brand-highlight">e-renova</span></b><br>R. Virgílio Bento de Queiróz, 164<br>Jardim Record, Taboão da Serra<br>SP, 06783-200')
    ];

    const group = L.featureGroup(markers).addTo(map);
    if (markers.length > 1) {
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
    } else {
        map.setView(markers[0].getLatLng(), 15);
    }

    return map;
}
