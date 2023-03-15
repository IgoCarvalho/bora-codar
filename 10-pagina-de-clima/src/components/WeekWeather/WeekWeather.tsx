import { WeatherCloudyIcon } from '../icons/WeatherCloudyIcon';

import styles from './WeekWeather.module.scss';

type WeekWeatherProps = {
  weekData: {
    maxTemperature: number;
    minTemperature: number;
    dayName: string;
  }[];
};

export function WeekWeather({ weekData }: WeekWeatherProps) {
  return (
    <div className={styles.container}>
      {weekData.map((weekDay) => (
        <div key={weekDay.dayName} className={styles.weather}>
          <p>{weekDay.dayName}</p>
          <WeatherCloudyIcon size={64} />
          <strong>
            {weekDay.maxTemperature}° <span>{weekDay.minTemperature}°</span>
          </strong>
        </div>
      ))}
    </div>
  );
}
