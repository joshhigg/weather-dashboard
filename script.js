// When the input is entered and the search button is clicked, 
// need to fetch the specific city's one day and 5 day forecast

var inputEl = document.querySelector('#input-city');
var buttonEl = document.querySelector('#submit');
var historyEl = document.querySelector('#search-history');

var APIkey = "284d1ee896223fdacddf5821349d21f3";


function handleFormSubmit() {

    var userInput = inputEl.value.trim();
    console.log(userInput)
    if (!userInput) {
        return
    }


    localStorage.setItem('city', userInput)
    runFetch(userInput)
    inputEl.value = ''
    displayHistory()

}

function displayHistory() {
    var historyButton = document.createElement("button")
    historyButton.textContent = localStorage.getItem('city')
    historyEl.appendChild(historyButton);
    historyButton.className = "historyButtonEl"
}



var runFetch = function (city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

    fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert('Error, City ' + response.statusText);
      }
    })
}


// Whatever was entered into the search bar will need to be saved in local storage 
// and added as a list item underneath the search button

buttonEl.addEventListener('click', handleFormSubmit);

inputEl.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buttonEl.click();
    }
});