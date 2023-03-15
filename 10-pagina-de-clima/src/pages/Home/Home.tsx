import { TemperatureNow } from '../../components/TemperatureNow/TemperatureNow';

import styles from './Home.module.scss';

export function Home() {
  return (
    <main className={styles.container}>
      <TemperatureNow />
    </main>
  );
}
