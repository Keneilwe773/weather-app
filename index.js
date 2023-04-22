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

let dayTime = `${formatTime(now)}`;
let link = document.querySelector("#dateTime");
if (link) {
  link.innerHTML = dayTime;
}


function showTemperature(response) {
  let descriptionElement = document.querySelector('#description');
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let iconElement = document.querySelector('#icon');
  // @ts-ignore
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  // @ts-ignore
  descriptionElement.innerHTML = response.data.weather[0].description;
  // @ts-ignore
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  // @ts-ignore
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  // @ts-ignore
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  console.log(response.data);
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


let form = document.querySelector("#city-search");
// @ts-ignore
form.addEventListener("submit", city);



function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  // @ts-ignore
  temperature.innerHTML = 24;
}

let celsius = document.querySelector("#celsius-link");
// @ts-ignore
celsius.addEventListener("click", convertToCelsius);


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  // @ts-ignore
  temperature.innerHTML = 75.2;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
// @ts-ignore
fahrenheit.addEventListener("click", convertToFahrenheit);

