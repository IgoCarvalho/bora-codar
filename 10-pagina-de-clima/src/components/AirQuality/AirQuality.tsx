import { LeafIcon } from '../icons/LeafIcon';

import styles from './AirQuality.module.scss';

export function AirQuality() {
  return (
    <div className={styles.airContainer}>
      <div className={styles.airHeader}>
        <LeafIcon />
        <p>Qualidade do ar</p>
      </div>

      <div className={styles.airContent}>
        <span>Boa</span>
        <p>21</p>
      </div>

      <div className={styles.airInfo}>
        <div>
          <p>12.9</p>
          <span>PM2.5</span>
        </div>
        <div>
          <p>12.9</p>
          <span>PM10</span>
        </div>
        <div>
          <p>2.1</p>
          <span>sO₂</span>
        </div>
        <div>
          <p>1.4</p>
          <span>NO₂</span>
        </div>
        <div>
          <p>21.2</p>
          <span>O₃</span>
        </div>
        <div>
          <p>0.7</p>
          <span>CO</span>
        </div>
      </div>
    </div>
  );
}
