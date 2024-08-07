import React from "react";
import "./WeatherDisplay.css";
import Tile from "./Tile";

function WeatherDisplay({ data }) {
  console.log(data);
  return (
    <div className="weather-container">
      {/* <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp} °C</p>
      <p>Weather: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity} %</p>
      <p>Wind Speed: {data.wind.speed} m/s</p> */}
      <Tile data={data.main.temp} text="Temperature" />
      <Tile data={data.main.humidity} text="Humidity" />
      <Tile data={data.wind.speed} text="Wind speed" />
      <Tile data={data.main.pressure} text="Pressure" />
      <Tile data={data.main.temp_max} text="Temp max" />
      <Tile data={data.main.temp_min} text="Temp min" />
    </div>
  );
}

export default WeatherDisplay;
