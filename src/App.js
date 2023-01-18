import { useState, useEffect } from "react";
import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";
import axios from "axios";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    const fetchLocation = async () => {
      const currentWeatherFetch = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      // console.log(currentWeatherFetch.data);
      const forecastFetch = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      // console.log(forecastFetch.data);
      Promise.all([currentWeatherFetch, forecastFetch])
        .then((response) => {
          const weatherResponse = response[0];
          const forcastResponse = response[1];

          setCurrentWeather({ ...weatherResponse.data });
          setForecast({ ...forcastResponse.data });
          console.log(currentWeather);
          console.log(forecast);
        })
        .catch(console.log);
    };
    fetchLocation();
  }, [latitude, longitude]);

  return (
    <div className="">
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
