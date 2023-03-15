import styles from './SunClock.module.scss';

type SunClockProps = {
  currentTime: string;
  sunriseTime: string;
  sunsetTime: string;
};

export function SunClock({ currentTime, sunriseTime, sunsetTime }: SunClockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sunContent}>
        <div className={styles.sunClockContainer}>
          <p className={styles.sunCurrentTime}>{currentTime}</p>

          <div className={styles.dot}></div>
          <div className={styles.sun}>
            <div className={styles.gradient}></div>
            <div className={styles.progress}></div>
          </div>
        </div>
      </div>

      <div className={styles.sunTimes}>
        <span>{sunriseTime}</span>
        <span>{sunsetTime}</span>
      </div>
    </div>
  );
}
