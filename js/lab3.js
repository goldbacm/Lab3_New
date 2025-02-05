var map = L.map('pointmap').setView([44.7, -122.5], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('/data/airports.geojson')
    .then(response => response.json())
    .then(data => {
    L.geoJSON(data).addTo(map);
    })
    .catch(error => console.error('Error: ', error));


    
var map2 = L.map('coolmap').setView([44.7, -122.5], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);

fetch('/data/USA_Major_Cities.geojson')
    .then(response => response.json())
    .then(data => {
    L.geoJSON(data).addTo(map2);
    })
    .catch(error => console.error('Error: ', error));

//var map = L.map('coolmap').setview([44.56, -123.26], 12); //this zooms to corvallis
//created a VARIABLE called map, send to div created, and go to these coordinates 
//creates a map object but need to load tile set to see the map
//L.tilelayer does this
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map); //addTo is how you add data to your map object 