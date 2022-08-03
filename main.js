//the first thing i did is to get all the html time and date element into js file //
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemEl =document.getElementById("current-weather-items");


/* i created an array of days and months in order to convart days 
and day value into months */
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


/* i tried to update the date and time without using the weather api since javascript enabled it
    therefore, i created set interval function and call the function everyone second
    to update the time and date and i did not clearinterval so that it can continue running */

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HFormat = hour >= 13 ? hour %12:hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ?"PM" : "AM"

    timeEl.innerHTML = hoursIn12HFormat + ":" + minutes+ " " + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ", " + date+ "  " + months[month]
    

}, 1000);

/*  after getting the date and months, i need to get all other data through the weather api,
therefore i will need to input my api key and call it
also i created a var of searchmethod while creating a function to search weather*/
let appId = "d3a23a6a7475f614747480aff5e140af";
let units = "imperial";
let searchMethod;


function getsearchMethod(searchTerm) {
    if (searchTerm.lenght === 5 && Number.parseInt(searchTerm) + '' ===searchTerm)
            searchMethod = "zip"; 
    else
        searchMethod ="q";
    }

 /* in order to create the searchweather function , i need to first fetch api, 
 the first argument is the  url for te api call and create two .then method, the first is to return json 
 and second is to call an iinit function */
function searchWeather(searchTerm){
    getsearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units${units}`).then(result => {return result.json();
    }).then(result => {
        init(result);
    })
}
 /*this is to pass thejsn andset the background base on the weather 
 details that we recieve. i will be using a switch statement so that whatever in switch c/ can do whatsin case */
function init(resultFromserver) {
    switch (resultFromserver.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url'("clear.jpg");
            break;

        case "Cloud":
            document.body.style.backgroundImage = 'url'("cloudy.jpg");
            break;
        
        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = 'url'("rain.jpg");
            break;
        
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url'("storm.jpg");
            break

        case "snow":
            document.body.style.backgroundImage = 'url'("snow.jpg");
            break;
        

        
    
        default:
            break;
    }
    //here, getting all the weather element into js file //
    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let temperatureElement = document.getElementById("temperature");
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windspeed');
    let cityHeaderElement = document.getElementById('cityHeader');
    let weatherIconElement = document.getElementById('documentIconImg');

    weatherIcon.src = "http://openweathermap.org/img/w" + resultFromserver.weather[0].icon + ".png";
    
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innnerText = resultDescription.charAt(0).toUpperCase() + result.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
    windSpeedElement.innerHTML = "Winds  at " + Math.floor(resultFromServer.wind.speed) + "m/s";
    humidityElement.innerHTML = "humidity levels at" + resultFromServer.wind.speed + "%";
     
    setPositionForWeatherInfo();


}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth =weatherContainer.clientWidth;
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2})`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = "visible";
}
/*this is to add eventlistner for the searchbtn to see if searchterm exist 
so that it can search weather
 */
document.getElementById('searchBtn').addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm)
        searchWeather(searchTerm);
})