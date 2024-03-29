import { WeatherResponse, WeatherTranslationData } from '../types/weatherApi';
import weatherTranslation from '../weatherTranslation.json';

const weatherToPt: Record<number, WeatherTranslationData> = weatherTranslation;

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
    icon: `/images/icons/${weatherToPt[data.current.condition.code].icon}.svg`,
    weatherText: weatherToPt[data.current.condition.code].text,
  };

  return currentDayData;
}

export function getAirQualityData(data: WeatherResponse) {
  const { pm2_5, us_aqi, ...airData } = data.current.air_quality;

  const usAqi = data.current.air_quality['us-epa-index'];

  const airQualityData = {
    usAqi,
    usAqiCount: us_aqi,
    pm25: pm2_5,
    ...airData,
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

  const temporaryFixedDate = new Date(date + ' 12:00');

  const weekDayName = formatter.format(temporaryFixedDate);

  return weekDayName;
}

export function getWeekWeatherData(data: WeatherResponse) {
  const toDayDate = data.current.last_updated.split(' ')[0];

  const weekDaysForecast = data.forecast.forecastday.filter((day) => day.date !== toDayDate);

  const weekWeatherData = weekDaysForecast.map((day) => ({
    maxTemperature: day.day.maxtemp_c,
    minTemperature: day.day.mintemp_c,
    dayName: getWeekDayName(day.date),
    icon: `/images/icons/${weatherToPt[day.day.condition.code].icon}.svg`,
    weatherText: weatherToPt[day.day.condition.code].text,
  }));

  return weekWeatherData;
}
