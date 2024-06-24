import axios from "axios";

const API_KEY = "c87eed3b62ba3e0fb9ab356c0976b931";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = (city) => {
  return axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
};

export const getWeatherByCoords = (lat, lon) => {
  return axios.get(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
};
