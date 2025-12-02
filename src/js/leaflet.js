// importa Leaflet e seu CSS via bundler
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import partnerIconUrl from '../images/renova-pin.svg';

export function initMap() {
    const el = document.querySelector('#map');
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
            .bindPopup('<b><span class="brand-highlight">e-renova</span></b><br>R. Virgílio Bento de Queiróz, 164<br>Jardim Record, Taboão da Serra - SP, 06783-200<br>segunda - sexta: 9h - 17h'),
        L.marker([-23.54309460619485, -46.63935315375649], { icon: partnerIcon })
            .addTo(map)
            .bindPopup('<b><span class="brand-highlight">Precinhos, Fashion accessories store</span></b><br>R. Dom José de Barros, 337<br>República, São Paulo - SP, 01036-000<br>terça - sábado: 10h - 18h'),
        L.marker([-23.64603585973996, -46.75389950556574], { icon: partnerIcon })
            .addTo(map)
            .bindPopup('<b><span class="brand-highlight">Tetris Brazilian Jiu Jitsu, Vila Prel</span></b><br>Rua Thereza Maia Pinto, 266<br>Vila Prel, São Paulo - SP, 05780-390<br>segunda: 17h30 - 19h30<br>terça: 8h - 11h30, 19h30 - 24h<br>quarta: 17h30 - 19h30<br>quinta: 8h - 11h30, 19h30 - 24h'),
        L.marker([-23.649849379087087, -46.76373777633802], { icon: partnerIcon })
            .addTo(map)
            .bindPopup('<b><span class="brand-highlight">Igreja Batista, Horto Ypê</span></b><br>Rua Edith Junqueira de Azevedo Marques, 91<br>Campo Limpo, São Paulo - SP, 05782-390<br>segunda - sexta: 12h - 17h')
    ];

    const group = L.featureGroup(markers).addTo(map);
    if (markers.length > 1) {
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
    } else {
        map.setView(markers[0].getLatLng(), 15);
    }

    return map;
}
