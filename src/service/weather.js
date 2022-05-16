
class Weather{
    async getWeather(pos){
        const posLat = pos[0] ? pos[0] : 37.5;
        const posLon = pos[1] ? pos[1] : 127;
        let seoul = 
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${posLat}&lon=${posLon}&lan=kr&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((data)=> data.json())
            .catch(()=>console.log('wrong input'));

        return seoul;
    }
    async getForecast(pos){
        const posLat = pos[0] ? pos[0] : 37.5;
        const posLon = pos[1] ? pos[1] : 127;
        
        let forecast = 
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${posLat}&lon=${posLon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((data)=> data.json())
            .catch(()=>console.log('wrong input'));
        return forecast;
    }
}
export default Weather;
