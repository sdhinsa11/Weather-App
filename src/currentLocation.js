//use static methods

// use the IIFE module pattern to do this, which is where the projects will be stored
// but we have our own class for the projects but call on it when we want to create it 
// we 

class Weather{
    // each weather object
    constructor(temp, feelslike, humidity, conditions, precip, uvindex, windspeed){
        this.temp = temp;
        this.feelslike = feelslike;
        this.humidity = humidity;
        this.conditions = conditions;
        this.precip = precip;
        this.uvindex = uvindex;
        this.windspeed = windspeed;
    }
}

var allDays = (function(){

    //controls the days of that week

    let allDays = [];

    function addToDays(t, fL, h, c, p, uv, ws){
        allDays.push(new Weather(t, fL, h, c, p, uv, ws));
    }
    
    function getDays(){
        return allDays;
    }

    return{
        addToDays: addToDays,
        getDays:getDays,
    };

})();

export {allDays, Weather};