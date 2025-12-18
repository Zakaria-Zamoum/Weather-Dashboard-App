import { useState, useEffect, useRef, useCallback } from "react";
import { get_weather_for_coords } from "../utils/weatherApi";
import { LOCATIONS } from "../config/locations";

export default function useWeather(city) {
  const [Current_Data_NOW, set_Current_Data_NOW] = useState(null);
  const [daily, set_daily] = useState(null);
  const [loading, set_loading] = useState(false);
  const [ERROR_state, set_ERROR_state] = useState(null);
  const [TimeOfLAST_update, set_TimeOfLAST_update] = useState(null);
  const cache_ref = useRef({});

  const ExecuteTheFetch = useCallback(
    async (city_name) => {
      const coords = LOCATIONS[city_name];
      if (!coords) {
        set_ERROR_state("Unknown city");
        set_Current_Data_NOW(null);
        set_daily(null);
        return;
      }

      const cached = cache_ref.current[city_name];
      if (cached && Date.now() - cached.ts < 5 * 60 * 1000) {
        set_Current_Data_NOW(cached.current);
        set_daily(cached.daily);
        set_TimeOfLAST_update(cached.ts);
        return;
      }

      set_loading(true);
      set_ERROR_state(null);

      try {
        const { current: cur, daily: dly, elapsed } = await get_weather_for_coords(coords);
        set_Current_Data_NOW(cur);
        set_daily(dly);
        const now = Date.now();
        set_TimeOfLAST_update(now);
        cache_ref.current[city_name] = { ts: now, current: cur, daily: dly, elapsed };
      } catch (err) {
        set_ERROR_state(err.response ? `${err.response.status}` : err.message || "Fetch failed");
        set_Current_Data_NOW(null);
        set_daily(null);
      } finally {
        set_loading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (city) ExecuteTheFetch(city);
  }, [city, ExecuteTheFetch]);

  const refresh = useCallback(() => ExecuteTheFetch(city), [city, ExecuteTheFetch]);

  return { current: Current_Data_NOW, daily, loading, error: ERROR_state, last_updated: TimeOfLAST_update, refresh };
}
