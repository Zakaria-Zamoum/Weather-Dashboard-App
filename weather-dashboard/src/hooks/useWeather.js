import { useState, useEffect, useRef, useCallback } from "react";
import { getWeatherForCoords } from "../utils/weatherApi";
import { LOCATIONS } from "../config/locations";

// Lightweight hook to fetch weather, cache results briefly and expose a refresh.
export default function useWeather(city) {
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const cacheRef = useRef({});

  const doFetch = useCallback(
    async (cityName) => {
      const coords = LOCATIONS[cityName];
      if (!coords) {
        setError("Unknown city");
        setCurrent(null);
        setDaily(null);
        return;
      }

      // Return cached result if it's fresh (5 minutes)
      const cached = cacheRef.current[cityName];
      if (cached && Date.now() - cached.ts < 5 * 60 * 1000) {
        setCurrent(cached.current);
        setDaily(cached.daily);
        setLastUpdated(cached.ts);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { current: cur, daily: dly, elapsed } = await getWeatherForCoords(coords);
        setCurrent(cur);
        setDaily(dly);
        const now = Date.now();
        setLastUpdated(now);
        cacheRef.current[cityName] = { ts: now, current: cur, daily: dly, elapsed };
      } catch (err) {
        setError(err.response ? `${err.response.status}` : err.message || "Fetch failed");
        setCurrent(null);
        setDaily(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (city) doFetch(city);
  }, [city, doFetch]);

  const refresh = useCallback(() => doFetch(city), [city, doFetch]);

  return { current, daily, loading, error, lastUpdated, refresh };
}
