import { AirQuality } from '../../components/AirQuality/AirQuality';
import { SunTime } from '../../components/SunTime/SunTime';
import { TemperatureNow } from '../../components/TemperatureNow/TemperatureNow';

import styles from './Home.module.scss';

export function Home() {
  return (
    <main className={styles.container}>
      <TemperatureNow />
      <div className={styles.rightContent}>
        <AirQuality />

        <SunTime />
      </div>
    </main>
  );
}
