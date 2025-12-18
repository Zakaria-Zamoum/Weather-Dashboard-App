import React, { useState } from "react";
import useWeather from "./hooks/useWeather";
import { default_city, city_list } from "./config/locations";

function Format_Week_Day(date_string) {
  return new Date(date_string).toLocaleDateString(undefined, {
    weekday: "short",
  });
}


function GET_Weather_Text(weather_code) {
  if (weather_code === 0) return "Clear sky";
  if (weather_code === 1 || weather_code === 2) return "Mostly clear";
  if (weather_code === 3) return "Overcast";
  if (weather_code >= 45 && weather_code <= 48) return "Foggy";
  if (weather_code >= 51 && weather_code <= 57) return "Light rain";
  if (weather_code >= 61 && weather_code <= 67) return "Rainy";
  if (weather_code >= 71 && weather_code <= 77) return "Snowy";
  if (weather_code >= 80 && weather_code <= 82) return "Rain showers";
  if (weather_code >= 95) return "Thunderstorm";
  return "Weather unavailable";
}

const RETRIEVE_icon = (weather_code, temp) => {
  if (weather_code >= 95) return "⛈️";
  if (weather_code >= 80) return "🌦️";
  if (weather_code >= 61) return "🌧️";
  if (weather_code >= 71) return "❄️";
  if (temp > 20) return "☀️";
  if (temp > 10) return "⛅";
  return "☁️";
};

export default function App() {
  const [Selected_City_Value, set_Selected_City_Value] = useState(default_city);
  const [inputForSearch, setInputForSearch] = useState(default_city);

  const {
    current,
    daily,
    loading,
    error,
    refresh,
  } = useWeather(Selected_City_Value);

  const Handle_Submit_EVENT = (e) => {
    e.preventDefault();

    const MATCH_found = city_list.find(
      (c) => c.toLowerCase() === inputForSearch.toLowerCase()
    );

    if (MATCH_found) {
      set_Selected_City_Value(MATCH_found);
      if (MATCH_found === Selected_City_Value) refresh();
    } else {
      set_Selected_City_Value(inputForSearch);
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex justify-center bg-gradient-to-br from-[#4A6FA5] to-[#2B4C7E]">
      <div className="w-full max-w-6xl space-y-6">

        <form onSubmit={Handle_Submit_EVENT} className="relative">
          <input
            type="text"
            value={inputForSearch}
            onChange={(e) => setInputForSearch(e.target.value)}
            placeholder="Search for a city..."
            list="city-options"
            className="w-full p-4 pl-6 rounded-2xl bg-white/20 text-white placeholder-gray-200 outline-none"
          />
          <datalist id="city-options">
            {city_list.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </form>

        {loading && (
          <div className="text-center py-20 text-2xl animate-pulse">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center py-10 bg-red-500/20 rounded-xl">
            {error}
          </div>
        )}

        {current && daily && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/20 rounded-3xl p-10 flex flex-col justify-between h-[300px]">
                <div>
                  <h1 className="text-4xl font-bold">{Selected_City_Value}</h1>
                  <p className="opacity-80">Morocco</p>
                </div>

                <div>
                  <span className="text-8xl font-bold">
                    {Math.round(current.temperature)}°C
                  </span>
                  <p className="text-2xl opacity-90 mt-1">
                    {GET_Weather_Text(current.weathercode)}
                  </p>
                </div>
              </div>

              <div className="bg-white/20 rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
                {daily.time.slice(0, 5).map((d, i) => (
                  <div
                    key={d}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/20 mb-2"
                  >
                    <span>{Format_Week_Day(d)}</span>
                    <span className="text-2xl">
                      {RETRIEVE_icon(
                        daily.weathercode[i],
                        daily.temperature_2m_max[i]
                      )}
                    </span>
                    <span>
                      {Math.round(daily.temperature_2m_max[i])}° /
                      <span className="opacity-60 ml-1">
                        {Math.round(daily.temperature_2m_min[i])}°
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/20 rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
<<<<<<< HEAD
              {[
                { label: "Humidity", value: `${current.relativehumidity_2m || 0}%`, icon: "💧" },
                { label: "Wind Speed", value: `${current.windspeed} km/h`, icon: "🌬️" },
                { label: "UV Index", value: `${current.uv_index || 0}`, icon: "☀️" },
                { label: "Visibility", value: `${(current.visibility_km || 0).toFixed(1)} km`, icon: "👁️" },
                { label: "Pressure", value: `${current.pressure_hpa || 0} hPa`, icon: "📉" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/20 p-5 rounded-2xl flex items-center justify-between hover:bg-white/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="opacity-80 font-medium">{item.label}</span>
                  </div>
                  <span className="font-bold text-lg">{item.value}</span>
                </div>
              ))}
=======
              <div className="space-y-3">
                <div>Humidity: {current.relativehumidity_2m}%</div>
                <div>Wind Speed: {current.windspeed} m/s</div>
                <div>UV Index: {current.uv_index ?? "N/A"}</div>
                <div>
                  Visibility: {current.visibility_km?.toFixed(1) ?? "N/A"} km
                </div>
                <div>Pressure: {current.pressure_hpa} hPa</div>
              </div>
>>>>>>> 0c4456dd52e6c812f8760952a5223a25128377a3
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
