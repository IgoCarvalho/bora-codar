import { WeatherResponse } from '../types/weatherApi';

export async function getCurrentWeatherInfo() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const res = await fetch(apiUrl);

  const data: WeatherResponse = await res.json();

  return data;
}
