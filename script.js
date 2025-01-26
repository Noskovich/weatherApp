document.getElementById("searchButton").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "93a2d93ebec5102d615b6096e8cdc54b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      document.getElementById(
        "cityName"
      ).textContent = `Город: ${data.name}, ${data.sys.country}`;
      document.getElementById(
        "temperature"
      ).textContent = `Температура: ${data.main.temp}°C`;
      document.getElementById(
        "description"
      ).textContent = `Описание: ${data.weather[0].description}`;
      document.getElementById(
        "humidity"
      ).textContent = `Влажность: ${data.main.humidity}%`;
      document.getElementById(
        "windSpeed"
      ).textContent = `Ветер: ${data.wind.speed} м/с`;
    } else {
      alert("Город не найден");
    }
  } catch (error) {
    alert("Ошибка при получении данных. Попробуйте позже.");
  }
}
