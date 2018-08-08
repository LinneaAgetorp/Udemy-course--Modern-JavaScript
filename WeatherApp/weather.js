
class Weather {
    constructor(city, country) {
        this.api_key = '64635b44be823c7fdb00c43788a687ad';
        this.city = city;
        this.country = country;
    }

    //Fetch weather form API
    async getWeather () {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.api_key}`);

        const responseData = response.json()
        return responseData
    }

    changeLocation(city, country) {
        this.city = city;
        this.country = country;
    }
}