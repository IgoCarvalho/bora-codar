import { HumidityIcon } from '../icons/HumidityIcon';
import { PinIcon } from '../icons/PinIcon';
import { RainIcon } from '../icons/RainIcon';
import { WeatherCloudyIcon } from '../icons/WeatherCloudyIcon';
import { WindIcon } from '../icons/WindIcon';

import styles from './TemperatureNow.module.scss';

type TemperatureNowProps = {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  wind: number;
  humidity: number;
  rain: number;
};

export function TemperatureNow({
  temperature,
  maxTemperature,
  minTemperature,
  wind,
  humidity,
  rain,
}: TemperatureNowProps) {
  return (
    <div className={styles.temperatureContainer}>
      <div className={styles.weatherIcon}>
        <WeatherCloudyIcon />
      </div>

      <div className={styles.temperatureHeader}>
        <button type="button">
          <PinIcon />
          Dep. Irapuan Pinheiro, CE
        </button>
      </div>

      <div className={styles.temperatureData}>
        <h1>
          {temperature} <sup>°C</sup>
        </h1>
        <p>
          {maxTemperature}°<span>{minTemperature}°</span>
        </p>
      </div>
      <div className={styles.weatherStatistics}>
        <div className={styles.statisticCard}>
          <WindIcon />
          <div>
            <p>Vento</p>
            <strong>
              {wind} <span>km/h</span>
            </strong>
          </div>
        </div>
        <div className={styles.statisticCard}>
          <HumidityIcon />
          <div>
            <p>Umidade</p>
            <strong>
              {humidity} <span>%</span>
            </strong>
          </div>
        </div>
        <div className={styles.statisticCard}>
          <RainIcon />
          <div>
            <p>Chuva</p>
            <strong>
              {rain} <span>%</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
