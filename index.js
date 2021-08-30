// baseUrl:"api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
  key: "98c874b438284f7137222e672eb56639",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

let searchInput = document.querySelector("#input-box");

searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    let searchInputValue = searchInput.value;
    searchInput.value = "";
    getWeatherStatus(searchInputValue);
  }
});

function getWeatherStatus(cityName) {
  fetch(
    `${weatherApi.baseUrl}?q=${cityName}&appid=${weatherApi.key}&units=metric`
  )
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => updateWeatherStatus(data));
}

function updateWeatherStatus(weatherInformation) {
  let temperatureInput = document.querySelector("#temp");
  temperatureInput.innerHTML = `${Math.round(
    weatherInformation.main.temp
  )}&deg;C`;
  let minmaxTemperatureInput = document.querySelector("#min-max");
  minmaxTemperatureInput.innerHTML = `${Math.floor(
    weatherInformation.main.temp_min
  )}&deg;C(min)/${Math.ceil(weatherInformation.main.temp_max)}&deg;C(max)`;
  let weatherStatus = document.querySelector("#weather");
  weatherStatus.innerHTML = `${weatherInformation.weather[0].main}`;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${weatherInformation.name},${weatherInformation.sys.country}`;
  updateDate();

  if (weatherInformation.weather[0].main == "Clear") {
    document.body.style.backgroundImage = "./images/clear.jpg";
  }
  else if (weatherInformation.weather[0].main == "Rain") {
    document.body.style.backgroundImage = "./images/rain.jpg";
  }
  else if (weatherInformation.weather[0].main == "Haze") {
    document.body.style.backgroundImage = "./images/haze.jpg";
  }
  else if (weatherInformation.weather[0].main == "Thunderstorm") {
    document.body.style.backgroundImage = "./images/thunderstorm.jpg";
  }
  else if (weatherInformation.weather[0].main == "Clouds") {
    document.body.style.backgroundImage = "./images/cloudy.jpg";
  }
}

function updateDate() {
  let todayDate = new Date();
  let dateInput = document.querySelector("#date");

  let dayName = todayDate.getDay();
  let monthName = todayDate.getMonth();
  let year = todayDate.getFullYear();
  let date = todayDate.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  dateInput.innerHTML = `${days[dayName]}, ${months[monthName]}, ${date} ${year}`
}
