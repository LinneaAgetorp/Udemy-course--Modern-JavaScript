// Init storage object
const storage = new Storage;

// Get stored location data
const weatherLocation = storage.getLocationData();

//Init weather class/object
const weather = new Weather(weatherLocation.city, weatherLocation.country);
//Init UI
const ui = new UI;




//Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

//Change location event
document.getElementById('w-change-btn').addEventListener('click', ()=> {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // Change location
    weather.changeLocation(city, country);

    //Set location in LS
    storage.setLocationData(city, country);

    //Get and display weather
    getWeather();

    //Close modal (jquery)
    $('#locModal').modal('hide')
})

function getWeather(){
    weather.getWeather()
        .then((results) => {
            console.log(results)
            ui.paint(results)
        })
        .catch((err) => console.log(err))
}

