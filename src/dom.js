import {allDays} from './currentLocation.js';
import {getData, currentWeather, weatherDays} from './callAPI.js';


function locationDisplay(place){
    const title = document.getElementById("title");
    title.textContent =`${place}`;

}

function currentCondDisplay(dayforecast,type = "C"){
    const dateTime = document.querySelector("#dateTime");
    const tempConditions = document.querySelector("#tempConditions");
    const otherInformation = document.querySelector("#otherInformation");

    // get the object 

    dateTime.innerHTML="";
    tempConditions.innerHTML="";
    otherInformation.innerHTML="";

    const dateTimeDiv = document.createElement("div");
    dateTime.className="dTime";
    
    dateTimeDiv.textContent = `${dayforecast.datet}`;
    dateTime.appendChild(dateTimeDiv);

    // temp and conditions 
    const temp = document.createElement("div");
    temp.className = "temp";
    if(type==="C"){
        temp.textContent = `${dayforecast.tempc}°C`;
    }
    else if(type==="F"){
        temp.textContent = `${dayforecast.tempf}°F`;

    }
    tempConditions.appendChild(temp);

    const conditions = document.createElement("div");
    conditions.className = "cond";
    conditions.textContent =`${dayforecast.conditions}`;

    const cond_pic = document.createElement("img");
    cond_pic.id="weather-icon";
    cond_pic.alt="Weather Icon";

    const iconPath = require(`./icons/${dayforecast.icon}.png`);
    cond_pic.src = iconPath;

    tempConditions.appendChild(conditions);
    tempConditions.appendChild(cond_pic);
    
    // other information
    if (type === "C"){
        createDivInformation("Feels Like", dayforecast.feelslikec);
    }
    else if(type==="F"){
        createDivInformation("Feels Like", dayforecast.feelslikef);
    }
    createDivInformation("Humidity", dayforecast.humidity);
    createDivInformation("Precipitation %", dayforecast.precip);
    createDivInformation("UVIndex", dayforecast.uvindex);
    createDivInformation("Windspeed", dayforecast.windspeed);
   

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

function dayDisplays(type="C"){
    // need to style it 
    const allDaysDivs = document.querySelector(".weeklyForecast");
    
    allDaysDivs.innerHTML="";
    const allofDays = allDays.getDays();


    allofDays.forEach((day)=>{
        // need to style and add a side bar that connects to it to show the extra information
        const dayDiv = document.createElement("div");
        dayDiv.className = "dayDiv";

        const dayTemp = document.createElement("p");
        if (type === "C"){
            dayTemp.textContent = `${day.tempc}°C`;
        }
        else if (type === "F"){
            dayTemp.textContent = `${day.tempf}°F`;
        }

        const dayConditions = document.createElement("p");
        dayConditions.textContent = `${day.conditions}`;

        const imgConditions = document.createElement("img");
        imgConditions.id = "weatherIcon";
        imgConditions.alt = "Weather Icon";

        const iconPath = require(`./icons/${day.icon}.png`);
        imgConditions.src = iconPath;


        const seeMore = document.createElement("button");
        seeMore.className = "seeMore";
        seeMore.textContent= "...";
        // dayDiv.textContent = `Temp: ${day.temp} || Feelslike: ${day.feelslike} || Conditions: ${day.conditions} || Humidity: ${day.humidity} || Precipitation ${day.precip} || UV Index: ${day.uvindex} || Windspeed: ${day.windspeed} `;
        
        const otherInfo = document.createElement("div");
        otherInfo.className="popup";
        let info;

        if (type==="C"){
            info = `
            <p>Feels Like: ${day.feelslikec}°F</p>
            <p>Humidity: ${day.humidity}%</p>
            <p>Precipitation: ${day.precip}%</p>
            <p>UV Index: ${day.uvindex}</p>
            <p>Windspeed: ${day.windspeed}km/h</p>
            <button class="close">Close</button>
            `;
        }
        else if (type==="F"){
            info = `
            <p>Feels Like: ${day.feelslikef}°F</p>
            <p>Humidity: ${day.humidity}%</p>
            <p>Precipitation: ${day.precip}%</p>
            <p>UV Index: ${day.uvindex}</p>
            <p>Windspeed: ${day.windspeed}km/h</p>
            <button class="close">Close</button>
            `;
        }

        otherInfo.innerHTML=info;

        const closeButton = otherInfo.querySelector(".close");
        closeButton.addEventListener("click", ()=>{
            otherInfo.classList.remove("active");
        });



        dayDiv.appendChild(dayTemp);
        dayDiv.appendChild(dayConditions);
        dayDiv.appendChild(imgConditions);
        dayDiv.appendChild(seeMore);
        dayDiv.appendChild(otherInfo);
        allDaysDivs.appendChild(dayDiv);
    });

}

function showDayInformation(){
    let card = document.querySelectorAll(".seeMore");

    card.forEach(button =>{
        button.addEventListener('click', (event) =>{
            const dayDiv = event.target.closest('.dayDiv');
            let popup = dayDiv.querySelector(".popup");
            popup.classList.toggle('active');
        });
    });
}

async function render(){
    const searchLocation = document.getElementById("searchCity");

    let weatherD;

    // create instances over here to grab for the celsius and farenheit to access outside


    searchLocation.addEventListener("click", async (event) =>{ // needs to be an async function or else the promise doesnt get handled properly
        event.preventDefault();

        allDays.clearDays();
        // need to do some error handling

        const newL = document.getElementById("location").value;
        const newLocation = newL.charAt(0).toUpperCase() + newL.slice(1);

        const weatherData = await getData(newLocation);

        // get information for the current day
        const currentConditions = currentWeather(weatherData);
        weatherD = currentWeather(weatherData);

        // getting information for the next 7 days
        weatherDays(weatherData);


        // displaying all the information
        locationDisplay(weatherData.resolvedAddress);
        currentCondDisplay(currentConditions); // uses default
    
        dayDisplays();
        showDayInformation();


    });

    const celsius = document.getElementById("celsius");
    celsius.addEventListener("click", async () =>{
        currentCondDisplay(weatherD,"C");
        dayDisplays("C");
        showDayInformation();

    });

    const farenheit = document.getElementById("farenheit");
    farenheit.addEventListener("click", async () =>{
        currentCondDisplay(weatherD,"F");
        dayDisplays("F");
        showDayInformation();

    });

    
}

    


// function to display the title 

// function to display the current location 

// function to display the days 

// function to switch from celsius to farenheit and back again

export {render};