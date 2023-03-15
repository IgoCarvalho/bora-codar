import { AirQuality } from '../../components/AirQuality/AirQuality';
import { SunTime } from '../../components/SunTime/SunTime';
import { TemperatureNow } from '../../components/TemperatureNow/TemperatureNow';
import { WeekWeather } from '../../components/WeekWeather/WeekWeather';

import styles from './Home.module.scss';

export function Home() {
  return (
    <main className={styles.container}>
      <TemperatureNow />
      <div className={styles.rightContent}>
        <AirQuality />

        <SunTime />

        <WeekWeather />
      </div>
    </main>
  );
}
