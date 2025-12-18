import axios from "axios";

export async function get_weather_for_coords({ lat, lon }) {
  const start = Date.now();

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const res = await axios.get(url, { timeout: 10000 });
  const elapsed = Date.now() - start;

  if (!res || !res.data) throw new Error("Empty response from weather API");
  const currentTime = res.data.current_weather?.time;
  let currentHumidity = null;

  if (currentTime && res.data.hourly?.time?.length) {
    const currentHour = currentTime.slice(0, 13);
    const humidityIndex = res.data.hourly.time.findIndex((t) =>
      t.startsWith(currentHour)
    );

    if (humidityIndex !== -1) {
      currentHumidity = res.data.hourly.relativehumidity_2m[humidityIndex];
    }
  }

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
