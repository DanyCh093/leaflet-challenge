//https://account.mapbox.com/

// API key
const API_KEY ="pk.eyJ1IjoiZGFueTA5MyIsImEiOiJja2MzcDUwcjAwMDNtMnlyeGU1dXI1NnFjIn0.MivxXMFGFZGh-5trvICTYA"



// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 2
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);


//   var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  d3.json(link, function(data) {
      earthquakes = data.features;
    //   console.log(earthquakes);
    for (var i=0; i < earthquakes.length;i++){
        coords = [earthquakes[i].geometry.coordinates[1],earthquakes[i].geometry.coordinates[0]];
        // console.log(coords)
        mag = earthquakes[i].properties.mag;
        place =  earthquakes[i].properties.place;
        // console.log("mag is ",mag);

        var color = "";
        color = "red";
            if (mag > 5) {
        }
        else if (mag > 4) {
          color = "orange";
        }
        else if (mag > 3) {
          color = "yellow";
        }
        else if (mag>2) {
          color = "green";
        }
        else if (mag >1){
            color = "blue";
        }
        else {
            color = "purple";
        }

        L.circle(coords, {
            fillOpacity: 0.75,
            color: "black",
            fillColor: color,
            // Adjust radius
            radius:  25000*mag
          }).bindPopup("<h3>" + place + "</h3>" + "<hr>" + "Magnitude:"+mag ).addTo(myMap);
        } 

        function getColor(d) {
          return d > 5 ? 'red' :
                 d > 4  ? 'orange' :
                 d > 3  ? 'yellow' :
                 d > 2  ? 'green' :
                 d > 1   ? 'blue' :
                 d > 0   ? 'purple' :
                 
                            '#FFEDA0';
      }


        var legend = L.control({position: 'bottomright'});
        
        legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1,2,3,4,5],
          labels = [];
          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
           
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }
          return div;
        };
        
        legend.addTo(myMap);
      }
      
      )
