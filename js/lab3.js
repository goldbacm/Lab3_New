//declare map variable globally so all functions have access
var map;
var minValue;

//creating map for the proportional symbols    
var map = L.map('coolmap').setView([39.8283, -98.5795], 4.5);

//adding openstreet map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//function to get radius
function getradius(attValue) {
    //establih an if else statement to sort the population into differnt size radius
    if (attValue <=169067){
        return 2;
    }
    else if (attValue <=699521){
        return 8;
    }
    else if (attValue <=2781116){
        return 12;
    }
    else {
        return 16;
    }
 
}

//function to get colors
function getcolor(attValue) {
    // if else statement to sort the sizes into differnt color circles 
    if (attValue <=169067){
        return "#73ED15";
    }
    else if (attValue <=699521){
        return "#EDED16";
    }
    else if (attValue <=2781116){
        return "#F6760B";
    }
    else {
        return "#FF0000";
    }
        
}
 



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

//Determine the attribute for scaling the proportional symbols
var attribute = "POPULATION"
L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        //Step 5: For each feature, determine its value for the selected attribute
        var attValue = Number(feature.properties[attribute]);

        //examine the attribute value to check that it is correct
        console.log(feature.properties, attValue);
        //call the function and assign to the radius of geoJson markeroptions
        geojsonMarkerOptions.radius = getradius(attValue);
         //call the function and assign to the radius of geoJson markeroptions
         geojsonMarkerOptions.fillColor = getcolor(attValue);
         //get the big cities to appear in front
         geojsonMarkerOptions.zIndex = attValue;
       //create circle markers
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    //add popups and list out the name and population amount
    onEachFeature: (feature, layer) => {
        // Add popups with city information
        var state = feature.properties.ST;
        var city = feature.properties.NAME;
        var population = feature.properties.POPULATION.toLocaleString();
        layer.bindPopup(`<b>State: ${state}</b><br> City: ${city}</b><br>Population: ${population}`);
    }
}).addTo(map);
};


// Create the legend control
var legend = L.control({ position: "bottomright" });

// Add details to the legend
legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");

    // Apply custom background and padding styles for the legend box
    div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    div.style.padding = "10px";
    div.style.borderRadius = "5px";
    div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";

    var grades = [169067, 699521, 2781116, Infinity];
    var labels = ["<strong>Population</strong>", "<br>"];

    // Loop through the population ranges to create colored labels
    for (var i = 0; i < grades.length; i++) {
        var color = getcolor(grades[i]);
        var radius = getradius(grades[i]);

        // Add legend item for each population range
        labels.push(
            '<i style="background:' + color + '; width: ' + radius * 2 + 'px; height: ' + radius * 2 + 'px; border-radius: 50%; display: inline-block;"></i> ' +
            (grades[i] === Infinity ? ">" + grades[i-1] : "≤ " + grades[i]) +
            "<br>"
        );
    }

    div.innerHTML = labels.join("");
    return div;
};

// Add the legend to the map
legend.addTo(map);


//get the data
fetch('/data/USA_MajorCities_2.geojson')
    .then(response => response.json())
    .then(data => {
   
        //call function to create proportional symbols
        createPropSymbols(data);
    })
    .catch(error => console.error('Error: ', error));

//Citing Sources: chatgpt helped with the legend. The Roth chapters and Leaflet tutorials were also used for other parts.