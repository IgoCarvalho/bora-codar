import { WeatherResponse } from '../types/weatherApi';

function getCurrentDayFromForecast(data: WeatherResponse) {
  const currentDate = data.current.last_updated.split(' ')[0];

  const currentDay = data.forecast.forecastday.find((day) => day.date === currentDate);

  return currentDay;
}

export function getCurrentDayData(data: WeatherResponse) {
  const dayFromForecast = getCurrentDayFromForecast(data);

  const currentDayData = {
    temperature: data.current.temp_c,
    maxTemperature: dayFromForecast?.day.maxtemp_c,
    minTemperature: dayFromForecast?.day.mintemp_c,
    wind: data.current.wind_mph,
    humidity: data.current.humidity,
    rain: dayFromForecast?.day.daily_chance_of_rain,
  };

  return currentDayData;
}

export function getAirQualityData(data: WeatherResponse) {
  const airQualityData = {
    ...data.current.air_quality,
  };

  return airQualityData;
}

function formatSunTime(time: string) {
  const date = new Date(`1/1/2023 ${time}`);

  const sunTime = `${date.getHours()}:${date.getMinutes()}`;

  return sunTime;
}

export function getSunTimeData(data: WeatherResponse) {
  const dayFromForecast = getCurrentDayFromForecast(data);

  const toDay = new Date();
  const currentTime = `${toDay.getHours()}:${toDay.getMinutes()}`;

  const sunTimeData = {
    currentTime,
    sunriseTime: formatSunTime(String(dayFromForecast?.astro.sunrise)),
    sunsetTime: formatSunTime(String(dayFromForecast?.astro.sunset)),
  };

  return sunTimeData;
}

function getWeekDayName(date: string) {
  const formatter = Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  });

  const weekDayName = formatter.format(new Date(date));

  return weekDayName;
}

export function getWeekWeatherData(data: WeatherResponse) {
  const toDayDate = data.current.last_updated.split(' ')[0];

  const weekDaysForecast = data.forecast.forecastday.filter((day) => day.date !== toDayDate);

  const weekWeatherData = weekDaysForecast.map((day) => ({
    maxTemperature: day.day.maxtemp_c,
    minTemperature: day.day.mintemp_c,
    dayName: getWeekDayName(day.date),
  }));

  return weekWeatherData;
}
