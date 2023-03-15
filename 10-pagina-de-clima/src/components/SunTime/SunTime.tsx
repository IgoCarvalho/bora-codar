import { SunClockIcon } from '../icons/SunClockIcon';
import { SunClock } from '../SunClock/SunClock';

import styles from './SunTime.module.scss';

export function SunTime() {
  return (
    <div className={styles.sunContainer}>
      <div className={styles.sunHeader}>
        <SunClockIcon />
        <p>Horário do sol</p>
      </div>

      <div className={styles.sunClockContainer}>
        <SunClock />
      </div>
    </div>
  );
}
