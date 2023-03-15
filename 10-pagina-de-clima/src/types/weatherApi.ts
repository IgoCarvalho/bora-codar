type AirQuality = {
  pm2_5: number;
  pm10: number;
  so2: number;
  no2: number;
  o3: number;
  co: number;
  us_aqi: number;
  'us-epa-index': number;
};

type CurrentWeather = {
  temp_c: number;
  wind_mph: number;
  humidity: number;
  cloud: number;
  air_quality: AirQuality;
  last_updated: string;
};

type ForecastDay = {
  astro: {
    sunrise: string;
    sunset: string;
  };
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: {
      code: number;
    };
  };
};

export type WeatherResponse = {
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
};

export type AirQualityResponse = {
  hourly: {
    us_aqi: number[];
  };
};
