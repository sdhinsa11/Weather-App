import {allDays} from './currentLocation.js';
import {getData, currentWeather, weatherDays} from './callAPI.js';


function locationDisplay(place){
    const title = document.getElementById("title");
    title.textContent =`${place}`;

}

function currentCondDisplay(dayforecast){
    const dateTime = document.querySelector("#dateTime");
    const tempConditions = document.querySelector("#tempConditions");
    const otherInformation = document.querySelector("#otherInformation");

    // get the object 

    dateTime.innerHTML="";
    tempConditions.innerHTML="";
    otherInformation.innerHTML="";

    const dateTimeDiv = document.createElement("div");
    dateTime.className="dTime";
    dateTimeDiv.textContent = "8:00";
    dateTime.appendChild(dateTimeDiv);

    // temp and conditions 
    const temp = document.createElement("div");
    temp.className = "temp";
    temp.textContent = `${dayforecast.temp}`;
    tempConditions.appendChild(temp);

    const conditions = document.createElement("div");
    conditions.className = "cond";
    conditions.textContent =`${dayforecast.conditions}`;
    tempConditions.appendChild(conditions)

    // other information
    createDivInformation("Feels Like", dayforecast.feelslike);
    createDivInformation("Humidity", dayforecast.humidity);
    createDivInformation("Precipitation", dayforecast.precip);
    createDivInformation("UVIndex", dayforecast.humidity);
    createDivInformation("Humidity", dayforecast.humidity);
   

    // tempConditions.textContent = `Temperature: ${dayforecast.temp} || FeelsLike: ${dayforecast.feelslike} || Conditions: ${dayforecast.conditions}`;
    // otherInformation.textContent = `Humidity: ${dayforecast.humidity} || Precipitation ${dayforecast.precip} || UV Index: ${dayforecast.uvindex} || Windspeed: ${dayforecast.windspeed}`;

}

function createDivInformation(title, info){
    const otherInformation = document.querySelector("#otherInformation");
    
    const infoDiv = document.createElement("div");
    infoDiv.className="info";
    const infoDivtitle = document.createElement("h6");
    infoDivtitle.textContent = `${title}`;
    
    const infoDivinfo = document.createElement("p");
    infoDivinfo.textContent=`${info}`;

    infoDiv.appendChild(infoDivtitle);
    infoDiv.appendChild(infoDivinfo);
    otherInformation.appendChild(infoDiv);
}

function dayDisplays(){
    // need to style it 
    const allDaysDivs = document.querySelector(".weeklyForecast");
    
    allDaysDivs.innerHTML="";
    const allofDays = allDays.getDays();


    allofDays.forEach((day)=>{
        // need to style and add a side bar that connects to it to show the extra information
        const dayDiv = document.createElement("div");
        dayDiv.className = "dayDiv";

        const dayTemp = document.createElement("p");
        dayTemp.textContent = `${day.temp}`;

        const dayConditions = document.createElement("p");
        dayConditions.textContent = `${day.conditions}`;

        const seeMore = document.createElement("button");
        seeMore.textContent= "...";
        // dayDiv.textContent = `Temp: ${day.temp} || Feelslike: ${day.feelslike} || Conditions: ${day.conditions} || Humidity: ${day.humidity} || Precipitation ${day.precip} || UV Index: ${day.uvindex} || Windspeed: ${day.windspeed} `;
        
        dayDiv.appendChild(dayTemp);
        dayDiv.appendChild(dayConditions);
        dayDiv.appendChild(seeMore);
        allDaysDivs.appendChild(dayDiv);
    })

}

async function render(){
    const searchLocation = document.getElementById("searchCity");
    searchLocation.addEventListener("click", async (event) =>{ // needs to be an async function or else the promise doesnt get handled properly
        event.preventDefault();

        allDays.clearDays();
        // need to do some error handling

        const newL = document.getElementById("location").value;
        const newLocation = newL.charAt(0).toUpperCase() + newL.slice(1);

        const weatherData = await getData(newLocation);

        // get information for the days
        const currentConditions = currentWeather(weatherData);
        // console.log(currentConditions);
        weatherDays(weatherData);

        locationDisplay(weatherData.resolvedAddress);
        currentCondDisplay(currentConditions);
    
        dayDisplays();

    });

    
}

// function to display the title 

// function to display the current location 

// function to display the days 

// function to switch from celsius to farenheit and back again

export {render};