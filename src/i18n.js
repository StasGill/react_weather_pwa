import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: "SkySphere",
      temperature: "Temperature",
      weather: "Weather",
      humidity: "Humidity",
      wind_speed: "Wind Speed",
      enter_city: "Enter city name",
      get_weather: "Get Weather",
      use_location: "Use My Location",
      loading: "Loading...",
      error: "Error",
      location_error:
        "Unable to retrieve your location. Please enter a city name.",
      geolocation_not_supported:
        "Geolocation is not supported by this browser. Please enter a city name.",
      failed_to_fetch: "Failed to fetch weather data",
    },
  },
  ru: {
    translation: {
      welcome: "SkySphere",
      temperature: "Температура",
      weather: "Погода",
      humidity: "Влажность",
      wind_speed: "Скорость ветра",
      enter_city: "Введите название города",
      get_weather: "Получить погоду",
      use_location: "Использовать моё местоположение",
      loading: "Загрузка...",
      error: "Ошибка",
      location_error:
        "Не удалось получить ваше местоположение. Пожалуйста, введите название города.",
      geolocation_not_supported:
        "Геолокация не поддерживается вашим браузером. Пожалуйста, введите название города.",
      failed_to_fetch: "Не удалось получить данные о погоде",
    },
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
