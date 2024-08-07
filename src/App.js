import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const { t } = useTranslation();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(
    async (lat, lon) => {
      const apiKey = "c87eed3b62ba3e0fb9ab356c0976b931"; // Replace with your API key
      const url =
        lat && lon
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setLoading(false);
        if (data.cod === 200) {
          setWeatherData(data);
          setError("");
        } else {
          setError(data.message);
          setWeatherData(null);
        }
      } catch (err) {
        setLoading(false);
        setError(t("failed_to_fetch"));
        setWeatherData(null);
      }
    },
    [city, t]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          setError(t("location_error"));
        }
      );
    } else {
      setError(t("geolocation_not_supported"));
    }
  }, [fetchWeather, t]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{weatherData ? weatherData?.name : t("welcome")}</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("enter_city")}
          disabled={loading}
        />
        <button onClick={() => fetchWeather()} disabled={loading}>
          {t("get_weather")}
        </button>
        {/* <button onClick={() => fetchWeather()} disabled={loading}>
          {t("use_location")}
        </button> */}
        {loading && <p>{t("loading")}</p>}
        {error && (
          <p>
            {t("error")}: {error}
          </p>
        )}
        {weatherData && <WeatherDisplay data={weatherData} />}
      </header>
    </div>
  );
}

export default App;
