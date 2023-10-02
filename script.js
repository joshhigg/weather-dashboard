const elements = {
    inputEl: document.querySelector('#input-city'),
    buttonEl: document.querySelector('#submit'),
    historyEl: document.querySelector('#search-history'),
    todayWrap: document.querySelector('.today-forecast'),
    forecastWrap: document.querySelector('.five-day-forecast'),
    todayCity: document.querySelector('#today-city'),
    todayIcon: document.querySelector('#today-icon'),
    todayTemp: document.querySelector('#today-temp'),
    todayHumidity: document.querySelector('#today-humidity'),
    todayWind: document.querySelector('#today-wind'),
  };
  
  const forecastElements = [];
  for (let i = 1; i <= 5; i++) {
    forecastElements.push({
      day: document.querySelector(`#day-${i}`),
      icon: document.querySelector(`#icon-${i}`),
      temp: document.querySelector(`#temp-${i}`),
      humid: document.querySelector(`#humid-${i}`),
      wind: document.querySelector(`#wind-${i}`),
    });
  }
  
  const APIkey = "284d1ee896223fdacddf5821349d21f3";
  
  function handleFormSubmit() {
    const userInput = elements.inputEl.value.trim();
    if (!userInput) {
      return;
    }
  
    localStorage.setItem('city', userInput);
    fetchToday(userInput);
    fetchForecast(userInput);
    elements.inputEl.value = '';
    displayHistory();
  }
  
  function displayHistory() {
    const historyButton = document.createElement('button');
    const cityName = localStorage.getItem('city')
    historyButton.textContent = cityName;
    historyButton.className = 'historyButtonEl';

    historyButton.addEventListener('click', () => {
        fetchToday(cityName);
        fetchForecast(cityName);
    });

    elements.historyEl.appendChild(historyButton);
  }
  
  const fetchToday = function (city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
  
    fetch(queryURL)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            elements.todayWrap.hidden = false;
            elements.todayCity.innerHTML = `${data.name} (${dayjs().format('MM/DD/YYYY')})`;
            elements.todayIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
            elements.todayTemp.innerHTML = `Temp: ${data.main.temp}°F`;
            elements.todayHumidity.innerHTML = `Humidity: ${data.main.humidity}%`;
            elements.todayWind.innerHTML = `Wind: ${data.wind.speed} MPH`;
          });
        } else {
          alert(`Error, City ${response.statusText}`);
        }
      });
  };
  
  const fetchForecast = function (city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`;
  
    fetch(queryURL)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            elements.forecastWrap.hidden = false;
  
            for (let i = 0; i < forecastElements.length; i++) {
              const forecastDay = dayjs().add(i + 1, 'day').format('MM/DD/YYYY');
              const forecastData = data.list[i + 1];
              const forecastElement = forecastElements[i];
              console.log(forecastData.weather[0].icon)
  
              forecastElement.day.innerHTML = forecastDay;
              forecastElement.icon.src = "https://openweathermap.org/img/wn/" + forecastData.weather[0].icon + ".png";
              forecastElement.temp.innerHTML = `Temp: ${forecastData.main.temp}°F`;
              forecastElement.humid.innerHTML = `Humidity: ${forecastData.main.humidity}%`;
              forecastElement.wind.innerHTML = `Wind: ${forecastData.wind.speed} MPH`;
            }
          });
        } else {
          alert(`Error, City ${response.statusText}`);
        }
      });
  };

  elements.buttonEl.addEventListener('click', handleFormSubmit);
  
  elements.inputEl.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      elements.buttonEl.click();
    }
  });
  