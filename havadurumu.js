const apiKey = "7378326e9b85d24f1844b2ef00477471";
function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Lütfen şehir adını girin.");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"7378326e9b85d24f1844b2ef00477471"}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = `
<div><strong>Şehir:</strong> ${data.name}</div>
<div><strong>Tarih:</strong> ${new Date().toLocaleDateString()}</div>
<div><strong>Hava Durumu:</strong> ${data.weather[0].description}</div>
<div><strong>Sıcaklık:</strong> ${data.main.temp} °C</div>
<div><strong>Rüzgar Hızı:</strong> ${data.wind.speed} m/s</div>
`;
      fetchHourlyWeather(city);
    })
    .catch(error => alert("Şehir bulunamadı veya API hatası."));
}
function fetchHourlyWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      const hourlyDiv = document.getElementById("hourly");
      hourlyDiv.innerHTML = `<h3>Saatlik Tahmin</h3>`;
      data.list.slice(0, 5).forEach(hour => {
        hourlyDiv.innerHTML += `
<div>
<strong>Zaman:</strong> ${new Date(hour.dt * 1000).toLocaleTimeString()} -
<strong>Durum:</strong> ${hour.weather[0].description} -
<strong>Sıcaklık:</strong> ${hour.main.temp} °C
</div>
`;
      });
    });
}
