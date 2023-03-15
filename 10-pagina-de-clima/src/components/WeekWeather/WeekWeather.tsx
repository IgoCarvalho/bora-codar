import { WeatherCloudIcon } from '../icons/WeatherCloudIcon';
import { WeatherCloudyIcon } from '../icons/WeatherCloudyIcon';
import { WeatherLightningIcon } from '../icons/WeatherLightningIcon';
import { WeatherRainIcon } from '../icons/WeatherRainIcon';
import { WeatherSunnyIcon } from '../icons/WeatherSunnyIcon';

import styles from './WeekWeather.module.scss';

export function WeekWeather() {
  return (
    <div className={styles.container}>
      <div className={styles.weather}>
        <p>Amanhã</p>
        <WeatherCloudyIcon size={64} />
        <strong>
          21° <span>16°</span>
        </strong>
      </div>

      <div className={styles.weather}>
        <p>sexta-feira</p>
        <WeatherSunnyIcon />
        <strong>
          28° <span>20°</span>
        </strong>
      </div>

      <div className={styles.weather}>
        <p>sábado</p>
        <WeatherRainIcon />
        <strong>
          25° <span>21°</span>
        </strong>
      </div>

      <div className={styles.weather}>
        <p>domingo</p>
        <WeatherLightningIcon />
        <strong>
          20° <span>14°</span>
        </strong>
      </div>

      <div className={styles.weather}>
        <p>segunda-feira</p>
        <WeatherCloudIcon />
        <strong>
          24° <span>18°</span>
        </strong>
      </div>
    </div>
  );
}
