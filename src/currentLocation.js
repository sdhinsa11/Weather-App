class Weather{
    // each weather object
    constructor(temp, feelslike, humidity, conditions, precip, uvindex, windspeed, icon){
        this.tempf = temp;
        this.tempc = Math.round(((temp - 32) *(5/9)) * 10) / 10;
        this.feelslikef = feelslike;
        this.feelslikec = Math.round(((feelslike - 32) *(5/9)) * 10) / 10
        this.humidity = humidity;
        this.conditions = conditions;
        this.precip = precip;
        this.uvindex = uvindex;
        this.windspeed = windspeed;
        this.icon = icon;

        // this.dateTime = datetime;
    }
}

var allDays = (function(){

    //controls the days of that week

    let allDays = [];

    function addToDays(t, fL, h, c, p, uv, ws, ic){
        allDays.push(new Weather(t, fL, h, c, p, uv, ws, ic));
    }

    function getDays(){
        return allDays;
    }

    function clearDays(){
        allDays=[];
    }

    return{
        addToDays: addToDays,
        getDays:getDays,
        clearDays: clearDays,
    };

})();

export {allDays, Weather};