import MOROCCAN_CITIES from './moroccanCities.json';

export const LOCATIONS = MOROCCAN_CITIES.reduce((acc, city) => {
  acc[city.name] = {
    lat: parseFloat(city.latitude),
    lon: parseFloat(city.longitude)
  };
  return acc;
}, {});

export const DEFAULT_CITY = "Casablanca";
export const CITY_LIST = Object.keys(LOCATIONS).sort();

export const locations = LOCATIONS;
export const default_city = DEFAULT_CITY;
export const city_list = CITY_LIST;
