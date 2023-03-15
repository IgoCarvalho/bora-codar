import { AirQualityResponse, WeatherResponse } from '../types/weatherApi';

export async function getCurrentWeatherInfo() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const res = await fetch(apiUrl);

  const data: WeatherResponse = await res.json();

  const airInfo = await getAirQualityInfo();

  data.current.air_quality.us_aqi = airInfo.hourly.us_aqi[0];

  return data;
}

export async function getAirQualityInfo() {
  const res = await fetch(
    'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-5.92&longitude=-39.27&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi&timezone=auto'
  );

  const data: AirQualityResponse = await res.json();

  return data;
}
