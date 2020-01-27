import { WeatherService } from "./WeatherService.js";

class WeatherManager {
    constructor() {
        $("#button-all").click(() => this.getAll());
        $("#button-warmest").click(() => this.getWarmest());

        this._weatherService = new WeatherService();
    }

    getAll() {
        this._weatherService.getWeather()
        .then(
            data => this.displayAll(data),
            data => $("#error-message").text(`An error occurred (${data.status}).`)
        );
    }

    async getWarmest() {
        this._weatherService.getWeather()
            .then(
                data => this.displayWarmest(data),
                data => $("#error-message").text(`An error occurred (${data.status}).`)
            );
    }

    displayAll(weather) {
        let html = "";

        for (let i = 0; i < weather.length; ++i)
            html += `<p>${weather[i].city} - ${weather[i].temperature}°C</p>`;

        $("#results-all").html(html);
    }

    displayWarmest(weather) {
        let max = weather[0];

        for (let i = 1; i < weather.length; ++i) {
            if (weather[i].temperature > max.temperature)
                max = weather[i];
        }

        $("#results-warmest").html(`<p>${max.city} - ${max.temperature}°C</p>`);
    }
}

(function () {
    new WeatherManager();
})();