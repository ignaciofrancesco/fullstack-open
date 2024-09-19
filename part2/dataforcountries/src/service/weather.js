import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const appid = import.meta.env.VITE_OPENWEATHER_KEY;

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`
  );

  return request.then((response) => {
    const weather = response.data;
    return weather;
  });
};

export default { getWeather };
