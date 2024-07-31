// all API functions here
import {allDays, Weather} from './currentLocation.js';

async function getData(location){
    // gets the data 

    // test API better 
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=C3TGJCXMW6NQNT3RJWLU8ZJ4B&include=hours,days,current&elements=datetime,temp,precip,feelslike,humidity,conditions,uvindex,windspeed,icon`,  {mode: 'cors'});
    const weatherData = await response.json();
    // console.log(weatherData);
    // take the icon and thne have a lsit of options
    return weatherData;
    

}

function currentWeather(weatherData){
    const currentC = weatherData.currentConditions;
    return new Weather(currentC.datetime,currentC.temp, currentC.feelslike, currentC.humidity, currentC.conditions, currentC.precip, currentC.uvindex, currentC.windspeed, currentC.icon);
}

function weatherDays(weatherData){
    const days = weatherData.days.slice(0,7);
   
    days.forEach((day) =>{ 
        // console.log(day.temp, day.feelslike, day.humidity, day.conditions, day.precip, day.uvindex, day.windspeed);
        allDays.addToDays(day.datetime, day.temp, day.feelslike, day.humidity, day.conditions, day.precip, day.uvindex, day.windspeed, day.icon);
    });

    // to access it you get the all Days thing

}

export {getData, currentWeather, weatherDays};