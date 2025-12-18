import React, { useState } from "react";
import useWeather from "./hooks/useWeather";
import { default_city, city_list } from "./config/locations";


function Format_Week_Day(date_string) {
  return new Date(date_string).toLocaleDateString(undefined, { weekday: "short" });
}

export default function App() {

  const [Selected_City_Value, set_Selected_City_Value] = useState(default_city);
  const [inputForSearch, setInputForSearch] = useState(default_city);
  const { current, daily, loading, error, last_updated, refresh } = useWeather(Selected_City_Value);

  const Handle_Submit_EVENT = (e) => {
    e.preventDefault();
    const MATCH_found = city_list.find((c) => c.toLowerCase() === inputForSearch.toLowerCase());
    if (MATCH_found) {
      set_Selected_City_Value(MATCH_found);
      if (MATCH_found === Selected_City_Value) refresh();
    } else {
      set_Selected_City_Value(inputForSearch);
    }
  };

  const RETRIEVE_icon = (temp) => {
    if (temp > 20) return "☀️";
    if (temp > 10) return "⛅";
    return "🌧️";
  };

  return (
    <div
      className="min-h-screen text-white p-4 md:p-8 relative overflow-hidden flex flex-col items-center justify-center transition-all duration-500 bg-gradient-to-br from-[#4A6FA5] to-[#2B4C7E]"
    >

      <div className="relative z-10 w-full max-w-6xl space-y-6">

        <form onSubmit={Handle_Submit_EVENT} className="relative w-full">
          <input
            type="text"
            value={inputForSearch}
            onChange={(e) => setInputForSearch(e.target.value)}
            placeholder="Search for a city..."
            list="city-options"
            className="w-full p-4 pl-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/10 text-white placeholder-gray-200 outline-none focus:bg-white/30 transition-all text-lg shadow-lg [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0"
          />
          <datalist id="city-options">
            {city_list.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 bg-white/10 p-2 rounded-full">
            🔍
          </button>
        </form>

        {loading && <div className="text-center py-20 text-2xl animate-pulse">Loading weather data...</div>}
        {error && <div className="text-center py-10 bg-red-500/20 rounded-xl border border-red-500">{error}</div>}

        {current && daily && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="md:col-span-2 space-y-6">

              <div className="bg-white/20 backdrop-blur-lg rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between h-[300px]">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-wide">{Selected_City_Value}</h1>
                    <p className="opacity-80 text-lg">Morocco</p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-8xl md:text-9xl font-bold tracking-tighter">{Math.round(current.temperature)}°C</span>
                  <p className="text-2xl opacity-90 font-medium ml-2">partly cloudy</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 ml-2">5-Day Forecast</h3>
                <div className="space-y-3">
                  {daily.time.slice(0, 5).map((d, i) => (
                    <div key={d} className="flex items-center justify-between bg-white/20 p-4 rounded-xl hover:bg-white/30 transition-colors">
                      <span className="w-24 font-medium">{Format_Week_Day(d)}</span>
                      <span className="text-2xl">{RETRIEVE_icon(daily.temperature_2m_max[i])}</span>
                      <div className="flex gap-4 font-bold">
                        <span>{Math.round(daily.temperature_2m_max[i])}°</span>
                        <span className="opacity-60">{Math.round(daily.temperature_2m_min[i])}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="md:col-span-1">
              <div className="bg-white/20 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10 shadow-xl h-full">
                <h3 className="text-xl font-semibold mb-6 ml-2">Weather Details</h3>
                <div className="space-y-4">
                  {[
                    { label: "Humidity", value: `${current.relativehumidity_2m}%`
 , icon: "💧" },
                    { label: "Wind Speed", value: `${current.windspeed} m/s`, icon: "🌬️" },
                    { label: "UV Index", value: "3", icon: "☀️" },
                    { label: "Visibility", value: "9.66 km", icon: "👁️" },
                    { label: "Pressure", value: "1016 hPa", icon: "📉" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/20 p-5 rounded-2xl flex items-center justify-between hover:bg-white/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="opacity-80 font-medium">{item.label}</span>
                      </div>
                      <span className="font-bold text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
