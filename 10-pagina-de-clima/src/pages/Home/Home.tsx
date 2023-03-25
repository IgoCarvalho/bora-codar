import { useEffect, useState } from 'react';

import { AirQuality } from '../../components/AirQuality/AirQuality';
import { SearchLocationModal } from '../../components/SearchLocationModal/SearchLocationModal';
import { SunTime } from '../../components/SunTime/SunTime';
import { TemperatureNow } from '../../components/TemperatureNow/TemperatureNow';
import { WeekWeather } from '../../components/WeekWeather/WeekWeather';
import { getCurrentWeatherInfo } from '../../services/api';
import { WeatherResponse } from '../../types/weatherApi';
import {
  getAirQualityData,
  getCurrentDayData,
  getSunTimeData,
  getWeekWeatherData,
} from '../../utils/parseWeatherData';

import styles from './Home.module.scss';

export function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getWeatherData();
  }, []);

  async function getWeatherData() {
    try {
      const response = await getCurrentWeatherInfo();

      setWeatherData(response);
    } catch (error) {
      alert('Desculpa, mas aconteceu algo de errado, tente novamente mais tarde');
    }
  }

  function parseAppData() {
    if (weatherData) {
      const currentDayData = getCurrentDayData(weatherData);
      const airQualityData = getAirQualityData(weatherData);
      const sunTimeData = getSunTimeData(weatherData);
      const weekWeatherData = getWeekWeatherData(weatherData);

      return {
        currentDayData,
        airQualityData,
        sunTimeData,
        weekWeatherData,
      };
    }
  }

  function handleLocationChange() {
    setIsModalOpen(true);
  }

  const data = parseAppData();

  return (
    <>
      <main className={styles.container}>
        <TemperatureNow
          temperature={data?.currentDayData.temperature || 0}
          maxTemperature={data?.currentDayData.maxTemperature || 0}
          minTemperature={data?.currentDayData.minTemperature || 0}
          wind={data?.currentDayData.wind || 0}
          humidity={data?.currentDayData.humidity || 0}
          rain={data?.currentDayData.rain || 0}
          icon={data?.currentDayData.icon || ''}
          weatherText={data?.currentDayData.weatherText || ''}
          onLocationChange={handleLocationChange}
        />
        <div className={styles.rightContent}>
          <AirQuality airData={data?.airQualityData} />

          <SunTime
            currentTime={data?.sunTimeData.currentTime || ''}
            sunriseTime={data?.sunTimeData.sunriseTime || ''}
            sunsetTime={data?.sunTimeData.sunsetTime || ''}
          />

          <WeekWeather weekData={data?.weekWeatherData || []} />
        </div>
      </main>

      <SearchLocationModal isOpen={isModalOpen} handleClose={setIsModalOpen} />
    </>
  );
}
