import styles from './SunClock.module.scss';

export function SunClock() {
  return (
    <div className={styles.container}>
      <div className={styles.sunContent}>
        <div className={styles.sunClockContainer}>
          <p className={styles.sunCurrentTime}>16:01</p>

          <div className={styles.dot}></div>
          <div className={styles.sun}>
            <div className={styles.gradient}></div>
            <div className={styles.progress}></div>
          </div>
        </div>
      </div>

      <div className={styles.sunTimes}>
        <span>6:12</span>
        <span>18:52</span>
      </div>
    </div>
  );
}
