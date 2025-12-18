# 🌦️ Weather Dashboard App

A simple and responsive weather dashboard built with **React**, **Tailwind CSS**, and **Axios**.  
It fetches real-time weather data and a 5-day forecast .

---

## 🚀 Features
- Search for a city and view its current weather.
- Display temperature, wind speed, and direction.
- 5-day forecast with max/min temperatures.
- Responsive design styled with Tailwind CSS.
- Error handling and loading states for better UX.

---

## 📂 Project Structure
Weather-Dashboard-App/
├── weather-dashboard/        # React app root
│   ├── public/               # Static assets (index.html, icons, etc.)
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ForecastCard.js
│   │   │   ├── WeatherCard.js
│   │   │   └── DetailsCard.js
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # React entry point
│   │   ├── index.css         # Tailwind setup
│   │   └── ...               # Other files
│   ├── package.json          # Project dependencies & scripts
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── postcss.config.js     # PostCSS configuration
│   └── README.md             # Documentation
