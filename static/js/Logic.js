// Creating the map object
let myMap = L.map("map", {
    center: [27, -81.8],
    zoom: 7
    });
  
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  
    // Store the API query variables.
    // For docs, refer to https://dev.socrata.com/docs/queries/where.html.
    // And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
//    let baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
//    let date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
//    let complaint = "&complaint_type=Rodent";
//    let limit = "&$limit=10000";
  
    // Assemble the API query URL.
//    let url = baseURL + date + complaint + limit;
//    console.log(url);
    
    // Get the data with d3.
//    d3.json(url).then(function(response) {
//    console.log(response);
//    });

    d3.json("https://chronicdata.cdc.gov/resource/vgc8-iyc4.json").then(function(response2){
    console.log(response2);
    
    // Create a new marker cluster group.
        let markers = L.markerClusterGroup();
  
    // Loop through the data.
        for (let i = 0; i < response2.length; i++) {
  
      // Set the data location property to a variable.
            let location = response2[i].geolocation;
  
      // Check for the location property.
            if (location) {
  
        // Add a new marker to the cluster group, and bind a popup.
                markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                    .bindPopup(response2[i].placename));
            }
  
        }
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);

    });