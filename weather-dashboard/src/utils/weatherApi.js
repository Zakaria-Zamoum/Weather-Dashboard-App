import axios from "axios";

export async function get_weather_for_coords({ lat, lon }) {
  const start = Date.now();

<<<<<<< HEAD
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,uv_index,visibility,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
=======
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,uv_index,visibility,surface_pressure&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
>>>>>>> 0c4456dd52e6c812f8760952a5223a25128377a3

  const res = await axios.get(url, { timeout: 10000 });
  const elapsed = Date.now() - start;

  if (!res || !res.data) throw new Error("Empty response from weather API");

  const currentTime = res.data.current_weather?.time;
  let humidity = null;
  let uvIndex = null;
  let visibility = null;
  let pressure = null;

  if (currentTime && res.data.hourly?.time?.length) {
    const currentHour = currentTime.slice(0, 13); // YYYY-MM-DDTHH

    const index = res.data.hourly.time.findIndex((t) =>
      t.startsWith(currentHour)
    );

    if (index !== -1) {
      humidity = res.data.hourly.relativehumidity_2m[index];
      uvIndex = res.data.hourly.uv_index[index];
      visibility = res.data.hourly.visibility[index] / 1000; // meters → km
      pressure = res.data.hourly.surface_pressure[index];
    }
  }

  return {
    current: res.data.current_weather
      ? {
<<<<<<< HEAD
        ...res.data.current_weather,
        relativehumidity_2m: humidity,
        uv_index: uvIndex,
        visibility_km: visibility,
        pressure_hpa: pressure,
      }
=======
          ...res.data.current_weather,
          relativehumidity_2m: humidity,
          uv_index: uvIndex,
          visibility_km: visibility,
          pressure_hpa: pressure,
        }
>>>>>>> 0c4456dd52e6c812f8760952a5223a25128377a3
      : null,
    daily: res.data.daily || null,
    elapsed,
  };
}