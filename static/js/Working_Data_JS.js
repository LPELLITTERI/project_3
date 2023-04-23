const url = "https://chronicdata.cdc.gov/resource/vgc8-iyc4.json";

console.log("Loading data from URL: " + url);

// Read JSON from URL
const loadData = () => {
    return new Promise((resolve, reject) => {
        console.log(d3.version)
        d3.json(url).then(function(data){
            console.log("Success")
            resolve(data);
        });
    });
};

loadData()
    .then((data) => {
    console.log("Data loaded:", data);
})

function createMap() {

    let myMap = L.map("map", {
        center: [40.7, -73.95],
        zoom: 11
        });
      
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
      
    // Get the data with d3.
    d3.json(url).then(function(response) {
      
        // Create a new marker cluster group.
        let markers = L.markerClusterGroup();
      
        // Loop through the data.
        for (let i = 0; i < response.length; i++) {
      
            // Set the data location property to a variable.
            let location = response[i].location;
      
            // Check for the location property.
            if (location) {
      
            // Add a new marker to the cluster group, and bind a popup.
            markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
              .bindPopup(response[i].descriptor));
            }
      
        }
      
        // Add our marker cluster layer to the map.
        myMap.addLayer(markers);
      
    });
  
};
