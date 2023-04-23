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

    // Set the data location property to a variable.
    let location = filteredResponse[i].geolocation;
  
    // Check for the location property.
    if (location) {
  
    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(filteredResponse[i].placename + ' (Rate for Adults 18 & Older Unless Specified)'
            + '<br>________________________________________________'
            + '<br> Total Population: ' + filteredResponse[i].totalpopulation
            + '<br> Lack of Health Issurance Rate: ' + filteredResponse[i].access2_adjprev + '%'
            + '<br>'
            + '<br> Preventative Care Rates:'
            + '<br> Rate of Routine Checkups: ' + filteredResponse[i].checkup_adjprev + '%'
            + '<br> Rate Cholestrol Screenings: ' + filteredResponse[i].cholscreen_adjprev + '%'
            + '<br> Rate Fecal Occult Blood Tests, Sigmoidoscopy, or Colonoscopy Rate Age 50-75: ' + filteredResponse[i].colon_screen_adjprev + '%'
            + '<br> Preventative Services Men 65 and Older: ' + filteredResponse[i].corem_adjprev + '%'
            + '<br> Preventative Services Women 65 and Older: ' + filteredResponse[i].corew_adjprev + '%'
            + '<br> Mammography use Women 50-74: ' + filteredResponse[i].mammouse_adjprev + '%'
            + '<br>'
            + '<br>'
            + '<br> Mental Health Condition Rates:'
            + '<br> Unwell Mental State for More than 2 Weeks Rate: ' + filteredResponse[i].mhlth_adjprev + '%'
            + '<br> Depression: ' + filteredResponse[i].depression_adjprev + '%'
            + '<br>'
            + '<br> Chronic Illness Rates:'
            + '<br> Arthritis: ' + filteredResponse[i].arthritis_adjprev + '%'
            + '<br> Binge Drinking: ' + filteredResponse[i].binge_adjprev + '%'
            + '<br> High Blood Pressure: ' + filteredResponse[i].bphigh_adjprev + '%'
            + '<br> Cancer: ' + filteredResponse[i].cancer_adjprev + '%'
            + '<br> Asthma: ' + filteredResponse[i].casthma_adjprev + '%'
            + '<br> Obesity: ' + filteredResponse[i].obesity_adjprev + '%'
            + '<br> Kidney Disease: ' + filteredResponse[i].kidney_adjprev + '%'
            + '<br> High Cholestrol: ' + filteredResponse[i].highchol_adjprev + '%'
            + '<br> Diabetes: ' + filteredResponse[i].diabetes_adjprev + '%'
            + '<br> Coronary Heart Disease: ' + filteredResponse[i].chd_adjprev + '%'
            + '<br> COPD Rate: ' + filteredResponse[i].copd_adjprev + '%'
            + '<br>'
            + '<br> Dental Care Rates:' 
            + '<br> Regular Dental Visits Rate: ' + filteredResponse[i].dental_adjprev + '%'
            + '<br> Tooth Loss Rate in Adults 65 and Older: ' + filteredResponse[i].teethlost_adjprev + '%'
            ));
    }

}
  
// Add our marker clusters and layers to the map.
myMap.addLayer(markers);
});

// var app = new Vue({
//     el:"#app",
//     data: {
//       about: "#about",
//     }
//   })