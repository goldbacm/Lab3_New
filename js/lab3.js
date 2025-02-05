//declare map variable globally so all functions have access
var map;
var minValue;

//creating map for the proportional symbols    
var map = L.map('coolmap').setView([44.7, -122.5], 4);

//adding openstreet map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//get the data
fetch('/data/USA_Major_Cities.geojson')
    .then(response => response.json())
    .then(data => {
    L.geoJSON(data).addTo(map);
    })
    .then(function(json){
        //call function to create proportional symbols
        createPropSymbols(json);
    })
    .catch(error => console.error('Error: ', error));
    

// create proportional symbol
//Add circle markers for point features to the map
function createPropSymbols(data){
    //create marker options
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
};

//Add circle markers for point features to the map
function createPropSymbols(data){
//Determine the attribute for scaling the proportional symbols
var attribute = "Pop_2015";
L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        //Step 5: For each feature, determine its value for the selected attribute
        var attValue = Number(feature.properties[attribute]);

        //examine the attribute value to check that it is correct
        console.log(feature.properties, attValue);

        //create circle markers
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
};
