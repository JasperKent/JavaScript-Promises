export class WeatherService{
    constructor() {
        this._cache = null;
    }

    getWeather() {
        if (this._cache === null)       // Store the promise in the cache
            this._cache = $.ajax({
                url: "/api/weather",
                method: "GET"
            });

        return this._cache;
    }
}