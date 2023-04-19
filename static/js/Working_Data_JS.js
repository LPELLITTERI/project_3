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