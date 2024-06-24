import React, { useState, useEffect } from "react";
import { getWeather } from "./api/weatherApi";
import "./App.css";
import { getWeatherByCoords } from "./api/weatherApi";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Error getting location: ", err);
          setError("Could not get your location.");
        }
      );
    }
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getWeather(city);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError("Error fetching the weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const response = await getWeatherByCoords(lat, lon);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError("Error fetching the weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
