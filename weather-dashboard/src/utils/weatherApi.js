import axios from "axios";

export async function getWeatherForCoords({ lat, lon }) {
  const start = Date.now();
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await axios.get(url, { timeout: 10000 });
  const elapsed = Date.now() - start;

  if (!res || !res.data) throw new Error("Empty response from weather API");

  return {
    current: res.data.current_weather || null,
    daily: res.data.daily || null,
    elapsed,
  };
}
