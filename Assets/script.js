var currentDateTime = moment().format("dddd, MMMM DD, YYYY");
var coordinateUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?";
var futureWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=";
var apiKey = "&appid=3b92c34ecbe24c4b0b1e87a72b7cc453";
var unitParameter = "&units=imperial"
var searchCity = document.getElementById("cityName");
var lat;
var lon;
var h2El = document.getElementById("resultCity");
var ulEl = document.getElementById("resultCityInfo");

var futureDays = document.querySelectorAll(".card-title");
var futureImg = document.querySelectorAll(".card-img-top");
var futureText = document.querySelectorAll(".card-text");

var searchButton = document.getElementById("searchbtn");
var historyButton = document.getElementsByClassName("btn");

function clear() {
    ulEl.textContent = " ";
    for (let i = 0; i < 5; i++) {
        futureDays[i].textContent = moment().add(i + 1, "days").format("l");
        futureImg[i].src = "";
        futureText[i].textContent = "";
    }
}

// Get current weather
function search(event) {
    event.preventDefault(event);
    clear();
    // keep right side screen clear on load
    if (document.querySelector(".hide") != null) {
        document.querySelector(".hide").classList.remove("hide");
    }
    // convert city name to coordinates
    fetch(coordinateUrl + searchCity.value + apiKey)
        .then(function (response1) {
            return response1.json();
        })
        .then(function (data1) {
            lat = data1[0].lat;
            lon = data1[0].lon;

            var currentUrl = currentWeatherUrl + "lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts" + unitParameter + apiKey;
            //weather search using coordinates
            fetch(currentUrl)
                .then(function (response2) {
                    return response2.json();
                })
                // display current day weather
                .then(function (data2) {
                    clear();
                    var temp = document.createElement("li");
                    var wind = document.createElement("li");
                    var humidity = document.createElement("li");
                    var uvi = document.createElement("li");
                    var icon = document.createElement("IMG");
                    icon.src = "https://openweathermap.org/img/wn/" + data2.current.weather[0].icon + "@2x.png";


                    h2El.textContent = data1[0].name + " ( " + currentDateTime + " ) ";
                    temp.textContent = "Temp: " + data2.current.temp + " °F";
                    wind.textContent = "Wind: " + data2.current.wind_speed + " MPH";
                    humidity.textContent = "Humidity: " + data2.current.humidity + " %";
                    uvi.textContent = "UI Index: " + data2.current.uvi;

                    //add background color of UV Index to show favorable, moderate, or severe
                    if (data2.current.uvi <= 2) {
                        uvi.style.backgroundColor = "lightgreen";
                    }
                    else if (data2.current.uvi < 6) {
                        uvi.style.backgroundColor = "yellow";
                    }
                    else {
                        uvi.style.backgroundColor = "red";
                    }

                    // add all info to the list
                    h2El.append(icon);
                    ulEl.append(temp);
                    ulEl.append(wind);
                    ulEl.append(humidity);
                    ulEl.append(uvi);

                    // add current search to history list
                    var addButton = document.createElement("button");
                    addButton.textContent = data1[0].name;
                    document.getElementById("buttonsList").append(addButton);
                    addButton.classList.add("btn");

                    // add future 5 days forecast
                    for (let i = 0; i < 5; i++) {
                        //add image
                        futureImg[i].src = "https://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png";
                        // add temp, wind and humidity info
                        var futuretemp = document.createElement("li");
                        var futurewind = document.createElement("li");
                        var futurehumidity = document.createElement("li");
                        futuretemp.textContent = "Temp: " + data2.daily[i].temp.day + " °F";
                        futurewind.textContent = "Wind: " + data2.daily[i].wind_speed + " MPH";
                        futurehumidity.textContent = "Humidity: " + data2.daily[i].humidity + " %";
                        futureText[i].append(futuretemp);
                        futureText[i].append(futurewind);
                        futureText[i].append(futurehumidity);
                    }
                    history();
                })
        })
}

// Make history buttons work
function history(){
    for (let j = 0; j < historyButton.length; j++) {
        historyButton[j].addEventListener("click", function () {
            searchCity.value = historyButton[j].textContent;
            console.log(searchCity.value);
            clear();
            // convert city name to coordinates
            fetch(coordinateUrl + searchCity.value + apiKey)
                .then(function (response1) {
                    return response1.json();
                })
                .then(function (data1) {
                    lat = data1[0].lat;
                    lon = data1[0].lon;
        
                    var currentUrl = currentWeatherUrl + "lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts" + unitParameter + apiKey;
                    //weather search using coordinates
                    fetch(currentUrl)
                        .then(function (response2) {
                            return response2.json();
                        })
                        // display current day weather
                        .then(function (data2) {
                            clear();
                            temp = document.createElement("li");
                            wind = document.createElement("li");
                            humidity = document.createElement("li");
                            uvi = document.createElement("li");
                            icon = document.createElement("IMG");
                            icon.src = "https://openweathermap.org/img/wn/" + data2.current.weather[0].icon + "@2x.png";
        
                            h2El.textContent = data1[0].name + " ( " + currentDateTime + " ) ";
                            temp.textContent = "Temp: " + data2.current.temp + " °F";
                            wind.textContent = "Wind: " + data2.current.wind_speed + " MPH";
                            humidity.textContent = "Humidity: " + data2.current.humidity + " %";
                            uvi.textContent = "UI Index: " + data2.current.uvi;
        
                            //add background color of UV Index to show favorable, moderate, or severe
                            if (data2.current.uvi <= 2) {
                                uvi.style.backgroundColor = "lightgreen";
                            }
                            else if (data2.current.uvi < 6) {
                                uvi.style.backgroundColor = "yellow";
                            }
                            else {
                                uvi.style.backgroundColor = "red";
                            }
        
                            // add all info to the list
                            h2El.append(icon);
                            ulEl.append(temp);
                            ulEl.append(wind);
                            ulEl.append(humidity);
                            ulEl.append(uvi);
        
                            // add future 5 days forecast
                            for (let i = 0; i < 5; i++) {
                                //add image
                                futureImg[i].src = "https://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png";
                                // add temp, wind and humidity info
                                futuretemp = document.createElement("li");
                                futurewind = document.createElement("li");
                                futurehumidity = document.createElement("li");
                                futuretemp.textContent = "Temp: " + data2.daily[i].temp.day + " °F";
                                futurewind.textContent = "Wind: " + data2.daily[i].wind_speed + " MPH";
                                futurehumidity.textContent = "Humidity: " + data2.daily[i].humidity + " %";
                                futureText[i].append(futuretemp);
                                futureText[i].append(futurewind);
                                futureText[i].append(futurehumidity);
                            }
                        })
                })
        });
    }


}

searchButton.addEventListener("click", search);