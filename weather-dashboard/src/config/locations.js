export const LOCATIONS = {
  Casablanca: { lat: 33.59, lon: -7.62 },
  Rabat: { lat: 34.02, lon: -6.83 },
  Marrakech: { lat: 31.63, lon: -8.0 },
};

export const DEFAULT_CITY = "Casablanca";
export const CITY_LIST = Object.keys(LOCATIONS);

// Lowercase aliases — some teams prefer non-ALL_CAPS imports.
export const locations = LOCATIONS;
export const defaultCity = DEFAULT_CITY;
export const cityList = CITY_LIST;
