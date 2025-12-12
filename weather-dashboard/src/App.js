import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("Casablanca");

  const coordinates = {
    Casablanca: { lat: 33.59, lon: -7.62 },
    Rabat: { lat: 34.02, lon: -6.83 },
    Marrakech: { lat: 31.63, lon: -8.00 },
  };

  const fetchWeather = async (cityName) => {
    const { lat, lon } = coordinates[cityName] || coordinates["Casablanca"];

    const current = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const daily = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );

    setWeather(current.data.current_weather);
    setForecast(daily.data.daily);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getDay = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 text-white p-6">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="p-3 rounded w-full text-black"
        />
      </form>

      {weather && forecast && (
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded">
            <h1 className="text-2xl font-bold">{city}</h1>
            <p className="text-4xl">{Math.round(weather.temperature)}°C</p>
            <p>Wind: {weather.windspeed} m/s</p>
          </div>

          <div className="bg-white/10 p-6 rounded">
            <h2 className="text-xl font-semibold mb-2">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.time.map((date, i) => (
                <div key={date} className="bg-white/20 p-4 rounded text-center">
                  <p>{getDay(date)}</p>
                  <p>
                    {forecast.temperature_2m_max[i]}° / {forecast.temperature_2m_min[i]}°
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded">
            <h2 className="text-xl font-semibold mb-2">Weather Details</h2>
            <ul className="grid grid-cols-2 gap-4">
              <li>Temperature: {weather.temperature}°C</li>
              <li>Wind Speed: {weather.windspeed} m/s</li>
              <li>Direction: {weather.winddirection}°</li>
              <li>UV Index: 3 (static)</li>
              <li>Pressure: 1016 hPa (static)</li>
              <li>Visibility: 10 km (static)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}