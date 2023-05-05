import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(false);
  const [weather, setWeather] = useState({});

  //handleSubmit for form
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3244187444f4b03034a273eot82c9c1e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  //displayWeather for axios
  function displayWeather(response) {
    setResult(true);
    setWeather({
      temperature: Math.round(response.data.temperature.current),
      description: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
    });
  }

  //updateCity function
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit} width="100%">
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
        className="search-box ml-3"
      />{" "}
      <input type="submit" value="search" className="btn btn-primary" />
    </form>
  );

  return (
    <div>
      {form}
      <p className="ml-5 mt-4">{city}</p>
      <div className="row">
        <div className="col-6">
          <ul>
            <li>Temperature: {weather.temperature}°C</li>
            <li>Description: {weather.description}</li>
            <li>
              <img src={weather.icon} alt={weather.description} />
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind}km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
