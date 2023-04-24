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

    const nationalAvg = {
        access2_adjprev: 16.23, //
        checkup_adjprev: 73.26, //
        cholscreen_adjprev: 85.76, //
        colon_screen_adjprev: 67.21, //
        mammouse_adjprev: 73.66, //
        mhlth_adjprev: 15.62, //
        depression_adjprev: 21.02, //
        arthritis_adjprev: 26.68, //
        binge_adjprev: 16.05, //
        bphigh_adjprev: 33.97, //
        cancer_adjprev: 6.8, //
        casthma_adjprev: 10.2, //
        obesity_adjprev: 33.72, //
        kidney_adjprev: 3.32, //
        highchol_adjprev: 33.7, //
        diabetes_adjprev: 70,
        chd_adjprev: 7.26, //
        copd_adjprev: 8.22, //
        dental_adjprev: 59.24, //
        teethlost_adjprev: 16.44, //
    };
          
          // Define a function to add a triangle and delta value to a metric
    function addDeltaTriangle(value, nationalAvgValue) {
        const delta = value - nationalAvgValue;
        let triangle = '';
        if (delta > 0) {
            triangle = '<span style="color:green">&#9650;</span>'; // Green up triangle
        } 
        else if (delta < 0) {
            triangle = '<span style="color:red">&#9660;</span>'; // Red downward facing triangle
        }
        return triangle + ' ' + Math.abs(delta).toFixed(2);
        }
  
    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(filteredResponse[i].placename + '<br>(Percent of Population)(Delta National Average)<br>(Rate for Adults 18 & Older Unless Specified)'
            + '<br>_____________________________________________'
            + '<br> Total Population: ' + filteredResponse[i].totalpopulation 
            + '<br>'
            + '<br>' + filteredResponse[i].access2_adjprev + '%' + addDeltaTriangle(filteredResponse[i].access2_adjprev, nationalAvg.access2_adjprev) + '%' + ' Lack of Health Issurance Rate'
            + '<br>'
            + '<br> Preventative Care Rates: (RED = Bad)'
            + '<br>' + filteredResponse[i].checkup_adjprev + '%' + addDeltaTriangle(filteredResponse[i].checkup_adjprev, nationalAvg.checkup_adjprev) + '%' + ' Rate of Routine Checkups'
            + '<br>' + filteredResponse[i].cholscreen_adjprev + '%' + addDeltaTriangle(filteredResponse[i].cholscreen_adjprev, nationalAvg.cholscreen_adjprev) + '%' + ' Rate Cholestrol Screenings'
            + '<br>' + filteredResponse[i].colon_screen_adjprev + '%' + addDeltaTriangle(filteredResponse[i].colon_screen_adjprev, nationalAvg.colon_screen_adjprev) + '%' + ' Rate Fecal Occult Blood Tests, Sigmoidoscopy, or Colonoscopy Rate Age 50-75'
            + '<br>' + filteredResponse[i].corem_adjprev + '%' + ' Preventative Services Men 65 and Older'
            + '<br>' + filteredResponse[i].corew_adjprev + '%' + ' Preventative Services Women 65 and Older' 
            + '<br>' + filteredResponse[i].mammouse_adjprev + '%' + addDeltaTriangle(filteredResponse[i].mammouse_adjprev, nationalAvg.mammouse_adjprev) + '%' + ' Mammography use Women 50-74'
            + '<br>'
            + '<br> Mental Health Condition Rates: (RED = Good)'
            + '<br>' + filteredResponse[i].mhlth_adjprev + '%' + addDeltaTriangle(filteredResponse[i].mhlth_adjprev, nationalAvg.mhlth_adjprev) + '%' + ' Unwell Mental State for More than 2 Weeks Rate'
            + '<br>' + filteredResponse[i].depression_adjprev + '%' + addDeltaTriangle(filteredResponse[i].depression_adjprev, nationalAvg.depression_adjprev) + '%' + ' Depression'
            + '<br>'
            + '<br> Chronic Illness Rates: (RED = Good)'
            + '<br>' + filteredResponse[i].arthritis_adjprev + '%' + addDeltaTriangle(filteredResponse[i].arthritis_adjprev, nationalAvg.arthritis_adjprev) + '%' + ' Arthritis'
            + '<br>' + filteredResponse[i].binge_adjprev + '%' + addDeltaTriangle(filteredResponse[i].binge_adjprev, nationalAvg.binge_adjprev) + '%' + ' Binge Drinking'
            + '<br>' + filteredResponse[i].bphigh_adjprev + '%' + addDeltaTriangle(filteredResponse[i].bphigh_adjprev, nationalAvg.bphigh_adjprev) + '%' + ' High Blood Pressure'
            + '<br>' + filteredResponse[i].cancer_adjprev + '%' + addDeltaTriangle(filteredResponse[i].cancer_adjprev, nationalAvg.cancer_adjprev) + '%' + ' Cancer'
            + '<br>' + filteredResponse[i].casthma_adjprev + '%' + addDeltaTriangle(filteredResponse[i].casthma_adjprev, nationalAvg.casthma_adjprev) + '%' + ' Asthma'
            + '<br>' + filteredResponse[i].obesity_adjprev + '%' + addDeltaTriangle(filteredResponse[i].obesity_adjprev, nationalAvg.obesity_adjprev) + '%' + ' Obesity'
            + '<br>' + filteredResponse[i].kidney_adjprev + '%' + addDeltaTriangle(filteredResponse[i].kidney_adjprev, nationalAvg.kidney_adjprev) + '%' + ' Kidney Disease'
            + '<br>' + filteredResponse[i].highchol_adjprev + '%' + addDeltaTriangle(filteredResponse[i].highchol_adjprev, nationalAvg.highchol_adjprev) + '%' + ' High Cholestrol'
            + '<br>' + filteredResponse[i].diabetes_adjprev + '%' + addDeltaTriangle(filteredResponse[i].diabetes_adjprev, nationalAvg.diabetes_adjprev) + '%' + ' Diabetes'
            + '<br>' + filteredResponse[i].chd_adjprev + '%' + addDeltaTriangle(filteredResponse[i].chd_adjprev, nationalAvg.chd_adjprev) + '%' + ' Coronary Heart Disease'
            + '<br>' + filteredResponse[i].copd_adjprev + '%' + addDeltaTriangle(filteredResponse[i].copd_adjprev, nationalAvg.copd_adjprev) + '%' + ' COPD Rate'
            + '<br>'
            + '<br> Dental Care Rates: (RED = Good)' 
            + '<br>' + filteredResponse[i].dental_adjprev + '%' + addDeltaTriangle(filteredResponse[i].dental_adjprev, nationalAvg.dental_adjprev) + '%' + ' Regular Dental Visits Rate'
            + '<br>' + filteredResponse[i].teethlost_adjprev + '%' + addDeltaTriangle(filteredResponse[i].teethlost_adjprev, nationalAvg.teethlost_adjprev) + '%' + ' Tooth Loss Rate in Adults 65 and Older'
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