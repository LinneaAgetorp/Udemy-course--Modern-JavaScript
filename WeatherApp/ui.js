class UI {
    constructor(){
        this.location = document.getElementById('w-location');
        this.description = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');

        this.humidity = document.getElementById('w-humidity');
        this.wind = document.getElementById('w-wind');
        this.details = document.getElementById('w-details');
    }

    tempConverter(kelvin) {
        return Math.round(kelvin - 273.15)
    }

    paint(weather){
        this.location.textContent = 'Location: ' + weather.name;
        this.description.textContent = weather.weather[0].description;
        this.string.textContent = `Temp: ${this.tempConverter(weather.main.temp)} Celsius`;

        this.humidity.textContent = `Humidity: ${weather.main.humidity} %`;
        this.wind.textContent = `Wind speed: ${weather.wind.speed} meter/sec`;

    }
}