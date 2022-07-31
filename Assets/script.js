var currentDateTime = moment().format("dddd, MMMM DD, YYYY");
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var futureWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&appid=3b92c34ecbe24c4b0b1e87a72b7cc453";
var unitParameter = "&units=imperial"
var searchCity = document.getElementById("cityName");
var h2El = document.getElementById("resultCity");
var ulEl = document.getElementById("resultCityInfo");



var cityViewed;
var searchButton = document.getElementById("searchbtn");
var viewedButtons = document.querySelector(".btn");

// function init(){
//     searchCity.value = "San Diego";
//     search();
// }

// Get current weather
function search(event) {
    event.preventDefault();
    var currentUrl = currentWeatherUrl + searchCity.value + unitParameter + apiKey;

    fetch(currentUrl)
        .then(function (response) {
            if (response.status !== 200) {
                h2El.textContent = "Please enter a valid city name!"
                ulEl.textContent = " ";
                return;
            }
            else {
                return response.json();
            }
        })
        .then(function (data) {

            console.log(data);
            var temp = document.createElement("li");
            var wind = document.createElement("li");
            var humidity = document.createElement("li");
            var icon = document.createElement("IMG");
            icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";


            h2El.textContent = data.name + " ( " + currentDateTime + " ) ";
            temp.textContent = "Temp: " + data.main.temp + " °F";
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + " %";

            h2El.append(icon);
            ulEl.append(temp);
            ulEl.append(wind);
            ulEl.append(humidity);
        })
        forecast();
}

// 5-day forecast
function forecast() {

    var futureUrl = futureWeatherUrl + searchCity.value + unitParameter + apiKey;
    fetch(futureUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);

        })
}



searchButton.addEventListener("click", search);