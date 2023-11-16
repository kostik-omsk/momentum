export const weatherWidget = (lang) => {
  let city = document.querySelector('.city');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const weatherError = document.querySelector('.weather-error');
  const wind = document.querySelector('.wind');
  const storedCity = localStorage.getItem('inputCity');
  let cityDefault = lang == 'ru' ? 'Минск' : 'Minsk';
  const humidity = document.querySelector('.humidity');
  city.placeholder = lang == 'ru' ? '[Введите город]' : '[Enter city]';

  if (storedCity) {
    city.value = storedCity;
  } else {
    city.value = cityDefault;
  }

  getWeather(city.value);

  function getWeather(city) {
    weatherIcon.className = 'weather-icon owf';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=0e52906b88a085ba73f1c4b3fc94aa8e&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        weatherError.textContent = '';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent =
          lang == 'ru'
            ? `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
            : `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent =
          lang == 'ru'
            ? `Влажность: ${data.main.humidity}%`
            : `Humidity: ${data.main.humidity}%`;
      })
      .catch((error) => {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        weatherError.textContent =
          lang == 'ru'
            ? 'пустая строка или бессмысленный набор символов'
            : 'an empty string or a meaningless set of characters';
        humidity.textContent = '';
      });
  }
  city.addEventListener('input', (event) => {
    localStorage.setItem('inputCity', event.target.value);
  });
  city.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      getWeather(city.value);
    }
  });
};
