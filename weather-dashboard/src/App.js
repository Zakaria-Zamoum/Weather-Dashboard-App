import React, { useState } from "react";
import useWeather from "./hooks/useWeather";
import { defaultCity, cityList } from "./config/locations";


function formatweekday(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, { weekday: "short" });
}

export default function App() {
 
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const { current, daily, loading, error, lastUpdated, refresh } = useWeather(selectedCity);

 
  const handlesubmit = (e) => {
    e.preventDefault();
    refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 text-white p-6">
      
      <form onSubmit={handlesubmit} className="mb-6 flex gap-2">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-3 rounded text-black"
        >
          {cityList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-white/20 px-4 rounded text-sm py-3 hover:bg-white/30"
        >
          Refresh
        </button>
      </form>

      {loading && <p>Loading current conditions...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {current && daily && !loading && (
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded">
            <h1 className="text-2xl font-bold">{selectedCity}</h1>
            <p className="text-sm">Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "-"}</p>
            <p className="text-4xl">{Math.round(current.temperature)}°C</p>
            <p>Wind: {current.windspeed} m/s</p>
          </div>

          <div className="bg-white/10 p-6 rounded">
            <h2 className="text-xl font-semibold mb-2">Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {daily.time.map((d, i) => (
                <div key={d} className="bg-white/20 p-4 rounded text-center">
                  <p>{formatweekday(d)}</p>
                  <p>
                    {daily.temperature_2m_max[i]}° / {daily.temperature_2m_min[i]}°
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <ul className="grid grid-cols-2 gap-4">
              <li>Temp: {current.temperature}°C</li>
              <li>Wind: {current.windspeed} m/s</li>
              <li>Direction: {current.winddirection}°</li>
              <li>UV Index: n/a</li>
              <li>Pressure: n/a</li>
              <li>Visibility: n/a</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}