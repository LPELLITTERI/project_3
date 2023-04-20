// Creating the map object
let myMap = L.map("map", {
    center: [27, -81.8],
    zoom: 7
    });
  
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    d3.json("https://chronicdata.cdc.gov/resource/vgc8-iyc4.json").then(function(response){

    const filteredResponse = response.filter(obj => obj.stateabbr == 'FL');
    console.log('Filtered data:', filteredResponse);
    console.log('Number of objects in filteredData:', filteredResponse.length);

        let markers = L.markerClusterGroup();

        // Loop through the data.
        for (let i = 0; i < filteredResponse.length; i++) {
            console.log(filteredResponse[i].placename);

//            if (filteredResponse[i].placename === 'Fellsmere') {

            // Set the data location property to a variable.
            let location = filteredResponse[i].geolocation;
  
            // Check for the location property.
            if (location) {
  
                // Add a new marker to the cluster group, and bind a popup.
                markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                    .bindPopup(filteredResponse[i].placename));
            }
//            }
  
        }
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);

    });