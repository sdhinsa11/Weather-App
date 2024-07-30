// all API functions here
import {allDays, Weather} from './currentLocation.js';

async function getData(location){
    // gets the data 

    // test API better 
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=C3TGJCXMW6NQNT3RJWLU8ZJ4B&include=days,hours,current&elements=temp,precip,feelslike,humidity,conditions,uvindex,windspeed`,  {mode: 'cors'});
    const weatherData = await response.json();
    return weatherData;
    // console.log(weatherData);

}

function currentWeather(weatherData){
    const currentC = weatherData.currentConditions;
    return new Weather(currentC.temp, currentC.feelslike, currentC.humidity, currentC.conditions, currentC.precip, currentC.uvindex, currentC.windspeed);
}

function weatherDays(weatherData){
    const days = weatherData.days.slice(0,7);
   
    days.forEach((day) =>{ 
        // console.log(day.temp, day.feelslike, day.humidity, day.conditions, day.precip, day.uvindex, day.windspeed);
        allDays.addToDays(day.temp, day.feelslike, day.humidity, day.conditions, day.precip, day.uvindex, day.windspeed);
    });

    // to access it you get the all Days thing

}

export {getData, currentWeather, weatherDays};