import { Tooltip } from '../Tooltip/Tooltip';

import styles from './WeekWeather.module.scss';

type WeekWeatherProps = {
  weekData: {
    maxTemperature: number;
    minTemperature: number;
    dayName: string;
    icon: string;
    weatherText: string;
  }[];
};

export function WeekWeather({ weekData }: WeekWeatherProps) {
  return (
    <div className={styles.container}>
      {weekData.map((weekDay) => (
        <div key={weekDay.dayName} className={styles.weather}>
          <p>{weekDay.dayName}</p>
          <Tooltip title={weekDay.weatherText}>
            <img
              width={64}
              src={weekDay.icon}
              alt={weekDay.weatherText}
              title={weekDay.weatherText}
            />
          </Tooltip>

          <strong>
            {weekDay.maxTemperature}° <span>{weekDay.minTemperature}°</span>
          </strong>
        </div>
      ))}
    </div>
  );
}
