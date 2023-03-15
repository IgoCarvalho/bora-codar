import { SunClockIcon } from '../icons/SunClockIcon';
import { SunClock } from '../SunClock/SunClock';

import styles from './SunTime.module.scss';

type SunTimeProps = {
  currentTime: string;
  sunriseTime: string;
  sunsetTime: string;
};

export function SunTime(props: SunTimeProps) {
  return (
    <div className={styles.sunContainer}>
      <div className={styles.sunHeader}>
        <SunClockIcon />
        <p>Horário do sol</p>
      </div>

      <div className={styles.sunClockContainer}>
        <SunClock {...props} />
      </div>
    </div>
  );
}
