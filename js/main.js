import { login } from './login';

// OpenWeather Info
const openWeatherKey = '6102a812da477a662eca40c6b33cf325';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const buildDate = () => {
    return `${weekDays[(new Date()).getDay()]} ${months[(new Date().getMonth())]} ${new Date().getDate()} ${new Date().getFullYear()}`;
}

const getForecast = async () => {
    const urlToFetch = `${weatherUrl}?&q=Ofallon,us&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
    } catch(error) {
        console.log(error);
    }
}

const renderForecast = (day) => {
    const weatherContent = createWeatherHTML(day);
    document.getElementById('weather').innerHTML = weatherContent;
};

const createWeatherHTML = (currentDay) => {
    console.log(currentDay)
    return `<h2 id="weather-data">${buildDate()}</h2>
            <h4 id="weather-data">Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F Condition: ${currentDay.weather[0].description} <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png"></h4>
            <h4 id="weather-data">Real Feel: ${kelvinToFahrenheit(currentDay.main.feels_like)}&deg;F</h4>`;
}

function auth() {
    login();
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

document.onload = getForecast().then(forecast => renderForecast(forecast));

document.getElementById('login').onclick(auth());