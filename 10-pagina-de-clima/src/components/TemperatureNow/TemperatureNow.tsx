import { HumidityIcon } from '../icons/HumidityIcon';
import { PinIcon } from '../icons/PinIcon';
import { RainIcon } from '../icons/RainIcon';
import { WeatherCloudIcon } from '../icons/WeatherCloudIcon';
import { WindIcon } from '../icons/WindIcon';

import styles from './TemperatureNow.module.scss';

export function TemperatureNow() {
  return (
    <div className={styles.temperatureContainer}>
      <div className={styles.weatherIcon}>
        <WeatherCloudIcon />
      </div>

      <div className={styles.temperatureHeader}>
        <button type="button">
          <PinIcon />
          Dep. Irapuan Pinheiro, CE
        </button>
      </div>

      <div className={styles.temperatureData}>
        <h1>
          18 <sup>°C</sup>
        </h1>
        <p>
          22°
          <span>16°</span>
        </p>
      </div>
      <div className={styles.weatherStatistics}>
        <div className={styles.statisticCard}>
          <WindIcon />
          <div>
            <p>Vento</p>
            <strong>
              17 <span>km/h</span>
            </strong>
          </div>
        </div>
        <div className={styles.statisticCard}>
          <HumidityIcon />
          <div>
            <p>Umidade</p>
            <strong>
              31 <span>%</span>
            </strong>
          </div>
        </div>
        <div className={styles.statisticCard}>
          <RainIcon />
          <div>
            <p>Chuva</p>
            <strong>
              10 <span>%</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
