// Creating the map object

let layers = {
    PreventativeCare: new L.LayerGroup(),
    Dental: new L.LayerGroup(),
    MentalIllness: new L.LayerGroup(),
    ChronicIllness: new L.LayerGroup(),
};

let myMap = L.map("map", {
    center: [27, -81.8],
    zoom: 7,
    layers: [
        layers.PreventativeCare,
        layers.Dental,
        layers.MentalIllness,
        layers.ChronicIllness
    ]
});

let overlays = {
    "Preventative Care": layers.PreventativeCare,
    "Dental Care": layers.Dental,
    "Mental Illness": layers.MentalIllness,
    "Chronic Illness": layers.ChronicIllness
};

let info = L.control({
    position: "bottomright"
});

info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };

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

            // Set the data location property to a variable.
            let location = filteredResponse[i].geolocation;
  
            // Check for the location property.
            if (location) {
  
                // Add a new marker to the cluster group, and bind a popup.
                markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                    .bindPopup(filteredResponse[i].placename));
            }

        }
  
    // Add our marker clusters and layers to the map.
    myMap.addLayer(markers);
    L.control.layers(null, overlays).addTo(myMap);
    info.addTo(myMap);
    });

function updateLegend(value) {
    document.querySelector(".legend").innerHTML = [
        "<p class='PreventativeCare'>Preventative Care: " + value.PreventativeCare + "</p>",
        "<p class='Dental'>Dental: " + value.Dental + "</p>",
        "<p class='MentalIllness'>Mental Illness: " + value.MentalIllness + "</p>",
        "<p class='ChronicIllness'>Chronic Illness: " + value.ChronicIllness + "</p>"
    ].join("");
}