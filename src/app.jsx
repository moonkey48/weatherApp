import React, { useEffect,useState } from 'react';
import s from './app.module.css';
import ForecastItem from './components/forecastItem';

const App =({weather})=> {
  const [pos, setPos] = useState([37,127]);
  const [informations, setInformations] = useState({
    weatherDescription: 'Sunny',
    place: 'Seoul',
    tempNow: '20°C',
    dt: '1652675107',
  });
  const [mainWeather, setMainWeather] = useState('sunny');
  const [foreCast,setForeCast]= useState([])
  

  function setPosition(){
    function error() {
      console.log('wrong');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;   
      setPos([lat, lon])
    }, error);
  }
  function handleMainWeather(main){
    if(main === "Clouds"){
      setMainWeather('cloudy');
    }else if(main === "Clear"){
      setMainWeather('sunny');
    }else{
      setMainWeather('rainy');
    }
  }

  function getWeatherNow(){
    weather
    .getWeather(pos)
    .then(info=>{
      const newInfo ={
        weatherDescription: info.weather[0].description,
        place: info.name,
        tempNow: `${Math.round(info.main.temp-273.15)}°C`,
      }
      console.log(info);
      handleMainWeather(info.weather[0].main);
      setInformations(newInfo);
    });
  }
  function getWeatherForeCast(){
    weather
    .getForecast(pos)
    .then(info=>{
      let infos =[];
      for(let i=0;i<8;i++){ 
        let hour = i+1;
        let id =  info.hourly[i].dt;
        let temp = `${Math.round(info.hourly[i].temp-273.15)}°C`;
        let main = info.hourly[i].weather[0].main;
        infos.push([hour,id,temp,main]);
      }
      setForeCast(infos);
    });
  }
  useEffect(()=>{
    setPosition();
  },[]);

  useEffect(()=>{
    getWeatherNow();
    getWeatherForeCast();
  },[pos]);

  return(
    <>
      <video className={s.video} src={`/videos/${mainWeather}.mp4`} autoPlay muted loop></video>
      <div className={s.container}>
        <h1 className={s.tempNow}>{informations.tempNow}</h1>
        <h2 className={s.weatherDescription}>{informations.weatherDescription}</h2>
        <h2 className={s.place}>{informations.place}</h2>
        <ul className={s.forecastList}>
          {foreCast.map(item=><ForecastItem  key={item[1]} item={item} />)}
        </ul>
      </div>
    </>
  );
}

export default App;
