import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/current-weather';
import Forecast from './components/forecast';
import LineChart from './components/lineChart';
import SyncLoader from 'react-spinners/SyncLoader';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherData, setWeatherData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    const fetchLocation = async () => {
      const currentWeatherFetch = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
      );
      // console.log(currentWeatherFetch.data);
      const forecastFetch = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
      );

      // console.log(forecastFetch.data);
      Promise.all([currentWeatherFetch, forecastFetch])
        .then((response) => {
          const weatherResponse = response[0];
          const forcastResponse = response[1];

          setCurrentWeather({ ...weatherResponse.data });
          setForecast({ ...forcastResponse.data });
          setWeatherData({
            labels: forcastResponse.data.list.slice(0, 5).map((item) =>
              new Date(item.dt * 1000).toLocaleString('en-AU', {
                dateStyle: 'short',
                timeStyle: 'short',
              }),
            ),
            datasets: [
              {
                data: forcastResponse.data.list
                  .slice(0, 5)
                  .map((item) => item.main.temp),
                label: 'Temperature',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          });
          setLoading(false);
        })
        .catch(console.log);
    };

    fetchLocation();
  }, [latitude, longitude]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <SyncLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="App">
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {weatherData && <LineChart chartData={weatherData} />}
    </div>
  );
}

export default App;
