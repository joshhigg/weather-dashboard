// When the input is entered and the search button is clicked, 
// need to fetch the specific city's one day and 5 day forecast

var inputEl = document.querySelector('#input-city');
var buttonEl = document.querySelector('#submit');
var historyEl = document.querySelector('#search-history');
var todayWrap = document.querySelector('.today-forecast')
var forecastWrap = document.querySelector('.five-day-forecast')
var todayCity = document.querySelector('#today-city');
var todayTemp = document.querySelector('#today-temp');
var todayHumidity = document.querySelector('#today-humidity');
var todayWind = document.querySelector('#today-wind');

var dayOne = document.querySelector('#day-1');
var iconOne = document.querySelector('#icon-1');
var tempOne = document.querySelector('#temp-1');
var humidOne = document.querySelector('#humid-1');
var windOne = document.querySelector('#wind-1');
var dayTwo = document.querySelector('#day-2');
var iconTwo = document.querySelector('#icon-2');
var tempTwo = document.querySelector('#temp-2');
var humidTwo = document.querySelector('#humid-2');
var windTwo = document.querySelector('#wind-2');
var dayThree = document.querySelector('#day-3');
var iconThree = document.querySelector('#icon-3');
var tempThree = document.querySelector('#temp-3');
var humidThree = document.querySelector('#humid-3');
var windThree = document.querySelector('#wind-3');
var dayFour = document.querySelector('#day-4');
var iconFour = document.querySelector('#icon-4');
var tempFour = document.querySelector('#temp-4');
var humidFour = document.querySelector('#humid-4');
var windFour = document.querySelector('#wind-4');
var dayFive = document.querySelector('#day-5');
var iconFive = document.querySelector('#icon-5');
var tempFive = document.querySelector('#temp-5');
var humidFive = document.querySelector('#humid-5');
var windFive = document.querySelector('#wind-5');

var APIkey = "284d1ee896223fdacddf5821349d21f3";

// Run function when search button is clicked
function handleFormSubmit() {
    var userInput = inputEl.value.trim();
    if (!userInput) {
        return
    }

    localStorage.setItem('city', userInput)
    fetchToday(userInput)
    fetchForecast(userInput)
    inputEl.value = ''
    displayHistory()

}

// Display each city entered to show search history
function displayHistory() {
    var historyButton = document.createElement("button")
    historyButton.textContent = localStorage.getItem('city')
    historyEl.appendChild(historyButton);
    historyButton.className = "historyButtonEl"
}



var fetchToday = function (city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    todayWrap.hidden = false
                    todayCity.innerHTML = data.name + " (" + dayjs().format('MM/DD/YYYY') + ") " + data.weather[0].icon;
                    // make an icon map to be able to show the icon anytime the code is entered 
                    todayTemp.innerHTML = "Temp: " + data.main.temp + "°F";
                    todayHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
                    todayWind.innerHTML = "Wind: " + data.wind.speed + " MPH";
                });
            } else {
                alert('Error, City ' + response.statusText);
            }
        })
}

var fetchForecast = function(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    forecastWrap.hidden = false
                    dayOne.innerHTML = dayjs().add(1, 'day').format('MM/DD/YYYY')
                    iconOne.innerHTML = data.list[1].weather[0].icon;
                    tempOne.innerHTML ="Temp: " +  data.list[1].main.temp + "°F";
                    humidOne.innerHTML = "Humidity: " + data.list[1].main.humidity + "%";
                    windOne.innerHTML = "Wind: " + data.list[1].wind.speed + " MPH";

                    dayTwo.innerHTML = dayjs().add(2, 'day').format('MM/DD/YYYY')
                    iconTwo.innerHTML = data.list[2].weather[0].icon;
                    tempTwo.innerHTML ="Temp: " +  data.list[2].main.temp + "°F";
                    humidTwo.innerHTML = "Humidity: " + data.list[2].main.humidity + "%";
                    windTwo.innerHTML = "Wind: " + data.list[2].wind.speed + " MPH";

                    dayThree.innerHTML = dayjs().add(3, 'day').format('MM/DD/YYYY')
                    iconThree.innerHTML = data.list[3].weather[0].icon;
                    tempThree.innerHTML ="Temp: " +  data.list[3].main.temp + "°F";
                    humidThree.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";
                    windThree.innerHTML = "Wind: " + data.list[3].wind.speed + " MPH";
                    
                    dayFour.innerHTML = dayjs().add(4, 'day').format('MM/DD/YYYY')
                    iconFour.innerHTML = data.list[4].weather[0].icon;
                    tempFour.innerHTML ="Temp: " +  data.list[4].main.temp + "°F";
                    humidFour.innerHTML = "Humidity: " + data.list[4].main.humidity + "%";
                    windFour.innerHTML = "Wind: " + data.list[4].wind.speed + " MPH";

                    
                    dayFive.innerHTML = dayjs().add(5, 'day').format('MM/DD/YYYY')
                    iconFive.innerHTML = data.list[5].weather[0].icon;
                    tempFive.innerHTML ="Temp: " +  data.list[5].main.temp + "°F";
                    humidFive.innerHTML = "Humidity: " + data.list[5].main.humidity + "%";
                    windFive.innerHTML = "Wind: " + data.list[5].wind.speed + " MPH";
                });
            } else {
                alert('Error, City ' + response.statusText);
            }
        })
}


buttonEl.addEventListener('click', handleFormSubmit);

inputEl.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buttonEl.click();
    }
});


