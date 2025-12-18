import axios from "axios";

export async function get_weather_for_coords({ lat, lon }) {
  const start = Date.now();

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const res = await axios.get(url, { timeout: 10000 });
  const elapsed = Date.now() - start;

  if (!res || !res.data) throw new Error("Empty response from weather API");

  // 🔹 Extract current humidity from hourly data
  const currentTime = res.data.current_weather?.time;
  const humidityIndex = res.data.hourly?.time?.indexOf(currentTime);

  const currentHumidity =
    humidityIndex !== -1 && humidityIndex !== undefined
      ? res.data.hourly.relativehumidity_2m[humidityIndex]
      : null;

  return {
    current: res.data.current_weather
      ? {
          ...res.data.current_weather,
          relativehumidity_2m: currentHumidity,
        }
      : null,
    daily: res.data.daily || null,
    elapsed,
  };
}
