import { useEffect, useState } from "react";
import weatherService from "../service/weather";

const Weather = (props) => {
  const { city, lat, lon } = props;

  /* STATES */
  const [weather, setWeather] = useState(null);

  /* EFFECTS */
  useEffect(() => {
    weatherService.getWeather(lat, lon).then((newWeather) => {
      setWeather(newWeather);
    });
  }, [city]); // run effect only when the city changes.

  if (weather === null) {
    return null;
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        width="75"
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
