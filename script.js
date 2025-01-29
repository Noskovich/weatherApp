const city = document.getElementById("city").value;
const apiKey = "1742cda330b290539516219a807e13aa";
const locationBtn = document.querySelector(".location-btn");
const todayInfo = document.querySelector(".today-info");
const todayWeatherIcon = document.querySelector(".today-weather i");
const todayTemp = document.querySelector(".weather-temp");
const daysList = document.querySelector(".days-list");

const weatherIconMap = {
  "01d": "sun",
  "01d": "moon",
  "02d": "sun",
  "02n": "moon",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "cloud",
  "04n": "cloud",
  "09d": "cloud-rain",
  "09n": "cloud-rain",
  "10d": "cloud-rain",
  "10n": "cloud-rain",
  "11d": "cloud-lightning",
  "11n": "cloud-lightning",
  "13d": "cloud-snow",
  "13n": "cloud-snow",
  "50d": "water",
  "50n": "water",
};

function getWeatherData(loc) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // update today info
      const todayWeather = data.list[0].weather[0].description;

      const todayTemerature = `${Math.round(data.list[0].main.temp)}°C`;
      const todayWeatherIconCode = data.list[0].weather[0].icon;

      todayInfo.querySelector("h2").textContent = new Date().toLocaleDateString(
        "en",
        { weekday: "long" }
      );
      todayInfo.querySelector("span").textContent =
        new Date().toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      todayWeatherIcon.className = `bx bx-${weatherIconMap[todayWeatherIconCode]}`;
      todayTemp.textContent = todayTemerature;

      // update location and weather description in the left section
      const locationElement = document.querySelector("today-info > div > span");
      locationElement.textContent = `${data.city.name}, ${data.city.country}`;
      const weatherDescriptionElement =
        document.querySelector("today-weather > h3");
      weatherDescriptionElement.textContent = todayWeather;

      // update today info
      const todayPrecipitation = `${data.list[0].pop}%`;
      const todayHumidity = `${data.list[0].main.humidity}%`;
      const todayWindSpeed = `${data.list[0].wind.speed}m/s`;

      const dayInfoContainer = document.querySelector(".day-info");
      dayInfoContainer.innerHTML = `
          <div>
            <span class="title">precipitation</span>
            <span class="value">${todayPrecipitation}</span>
          </div>
          <div>
            <span class="title">wind speed</span>
            <span class="value">${todayWindSpeed}</span>
          </div>
          <div>
            <span class="title">humidity</span>
            <span class="value">${todayHumidity}</span>
          </div>`;

      // update next 4 days

      const today = new Date();
      const nextDaysData = data.list.slice(1);

      const uniqueDays = new Set();
      let count = 0;
      daysList.innerHTML = "";
      for (const dayData of nextDaysData) {
        const forecastDate = new Date(dayData.dt_txt);
        const dayAbbr = forecastDate.toLocaleTimeString("en", {
          weekday: "short",
        });
        const dayTemp = `${Math.round(dayData.main.temp)}°C`;
        const iconCode = dayData.weather[0].icon;

        if (!uniqueDays.has(dayAbbr) && forecastDate.getDate()) {
          uniqueDays.add(dayAbbr);
          daysList.innerHTML += `
          <li>
            <i class="bx bx-${weatherIconMap[iconCode]}"></i>
            <span>${dayAbbr}</span>
            <span class="day-temp">${dayTemp}</span>
          </li>`;
          count++;
        }
        // stop after get 4 days

        if (count === 4) {
          break;
        }
      }
    })
    .catch((error) => {
      alert(`${error}`);
    });
}

// Fetch weather data for defaul location Moscow

document.addEventListener("DOMContentLoaded", () => {
  const defaultLocation = "Moscow";
  getWeatherData(defaultLocation);
});

locationBtn.addEventListener("click", () => {
  getWeatherData(location);
});
