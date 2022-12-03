//formating current date and time
function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index >= 1) & (index < 7)) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                    <div class="row">
                      <div class="col-12 forecast-date">${formatDay(
                        forecastDay.time
                      )}</div>
                      <img src="${
                        forecastDay.condition.icon_url
                      }" alt="" width="30px" />
                      <div class="col-12 forecast-temp">
                        <span class="day-temp"> ${Math.round(
                          forecastDay.temperature.maximum
                        )}°</span>
                        <span class="night-temp">${Math.round(
                          forecastDay.temperature.minimum
                        )}°</span>
                      </div>
                    </div>
                  </div>
                `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`; //shecodes
  axios.get(apiUrl).then(displayForecast);
}
//get current temperature details
function showTemp(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.temperature.current; //shecodes

  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.city; //shecodes
  descriptionElement.innerHTML = response.data.condition.description; //shecodes -- error
  humidityElement.innerHTML = response.data.temperature.humidity; //shecodes
  windElement.innerHTML = Math.round(response.data.wind.speed); //shecodes
  dateElement.innerHTML = currentDate(response.data.time * 1000); //shecodes
  iconElement.setAttribute("src", response.data.condition.icon_url); //shecodes
  iconElement.setAttribute("alt", response.data.condition.icon); //shecodes

  getForecast(response.data.coordinates); //shecodes
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`; // shecodes
  axios.get(apiUrl).then(showTemp);
}
function submitInfo(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

//weather API

let apiKey = "45e6544763o7af19tbbb41a1c3521f60"; //shecodes key

let form = document.querySelector("#location-search");
form.addEventListener("submit", submitInfo);

search("Kyiv");
