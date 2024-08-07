import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";
// import { getMockData } from "./helpers";
import { getWeather, getWeatherByCoords } from "./api/weatherApi";

function App() {
  const { t } = useTranslation();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city).then(({ data }) => setWeatherData(data));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getWeatherByCoords(latitude, longitude)
          .then(({ data }) => setWeatherData(data))
          .catch((error) => {
            setLoading(false);
            setError(t("location_error"));
          })
          .finally(setLoading(false));
      });
    } else {
      setError(t("geolocation_not_supported"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form className="Form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t("enter_city")}
          />
          <button type="submit">{t("get_weather")}</button>
        </form>
        {loading && <p>{t("loading")}</p>}
        <div className="Tile-container">
          <h1>{weatherData ? weatherData?.name : t("welcome")}</h1>
          <p>{parseInt(weatherData?.main?.temp)} °C</p>
        </div>
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
