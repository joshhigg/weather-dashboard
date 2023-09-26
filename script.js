// When the input is entered and the search button is clicked, 
// need to fetch the specific city's one day and 5 day forecast

var inputEl = document.querySelector('#input-city');
var buttonEl = document.querySelector('#submit');
var historyEl = document.querySelector('#search-history');

function handleFormSubmit() {
    console.log(inputEl.value)
    if(!inputEl.value) {
        return
    }

    localStorage.setItem('city', inputEl.value)
    inputEl.value = ''
    displayHistory()
}

function displayHistory() {
    var historyButton = document.createElement("button")
    historyButton.textContent = localStorage.getItem('city')
    historyEl.appendChild(historyButton);
    historyButton.className = "historyButtonEl"
}



// Whatever was entered into the search bar will need to be saved in local storage 
// and added as a list item underneath the search button

buttonEl.addEventListener('click', handleFormSubmit);
