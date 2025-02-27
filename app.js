// Initialize the map
const map = L.map('map').setView([49.0, 31.0], 6); // Center on Ukraine, zoom level 6

// Add a tile layer (map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add markers for specific cities
const cities = [
    { name: "Kyiv", coordinates: [50.4501, 30.5234] },
    { name: "Lviv", coordinates: [49.8397, 24.0297] },
    { name: "Odesa", coordinates: [46.4825, 30.7233] },
    { name: "Kharkiv", coordinates: [49.9935, 36.2304] },
    { name: "Dnipro", coordinates: [48.4647, 35.0462] },
];

cities.forEach(city => {
    L.marker(city.coordinates)
        .addTo(map)
        .bindPopup(`<b>${city.name}</b>`); // Add a popup with the city name
});