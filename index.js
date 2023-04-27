let now = new Date();

function formatTime(now) {
  let hours = now.getHours();  // searching for current hour.
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();  // searching for current minutes.
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];  // searching for current day.
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function forecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(day, index) {
    if (index < 7) {
    forecastHTML = forecastHTML + `
      <div class="col properties">
        <div class="col temperatures">
          <span class="maximum">
           ${Math.round(day.temp.max)}°
          </span>
          <span class="minimum">
            ${Math.round(day.temp.min)}°
          </span>
        </div>
        <div class="col">
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" id="icons" />
        </div>
        <div class="col day">
          ${formatDay(day.dt)}
        </div>
      </div>`;}
  });
  forecastHTML = forecastHTML + `</div>`
  // @ts-ignore
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // @ts-ignore
  axios.get(apiUrl).then(forecast);
}

function showTemperature(response) {
  let descriptionElement = document.querySelector('#description');
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let iconElement = document.querySelector('#icon');
  celsiusTemperature = Math.round(response.data.main.temp);
  // @ts-ignore
  temperatureElement.innerHTML = celsiusTemperature;
  // @ts-ignore
  descriptionElement.innerHTML = response.data.weather[0].description;
  // @ts-ignore
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  // @ts-ignore
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  // @ts-ignore
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  console.log(response.data);
  getForecast(response.data.coord);
}


function city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let linking = document.querySelector("#city");
  // @ts-ignore
  linking.innerHTML = city.value;

  let units = "metric";
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  // @ts-ignore
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

  // @ts-ignore
  axios.get(apiUrl).then(showTemperature);
}


function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // @ts-ignore
  temperatureElement.innerHTML = celsiusTemperature;
}


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // @ts-ignore
  let fahrenheitTemperature = (celsiusTemperature *9)/5 + 32;
  // @ts-ignore
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let dayTime = `${formatTime(now)}`;
let link = document.querySelector("#dateTime");
if (link) {
  link.innerHTML = dayTime;
}

let form = document.querySelector("#city-search");
// @ts-ignore
form.addEventListener("submit", city);

let celsiusLink = document.querySelector("#celsius-link");
// @ts-ignore
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
// @ts-ignore
fahrenheitLink.addEventListener("click", convertToFahrenheit);
