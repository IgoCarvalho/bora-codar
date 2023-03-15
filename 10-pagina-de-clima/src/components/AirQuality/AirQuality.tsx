import { LeafIcon } from '../icons/LeafIcon';

import styles from './AirQuality.module.scss';

type AirQualityProps = {
  airData?: {
    pm25: number;
    pm10: number;
    so2: number;
    no2: number;
    o3: number;
    co: number;
    usAqi: number;
    usAqiCount: number;
  };
};

export function AirQuality({ airData }: AirQualityProps) {
  function parseData(value = 0) {
    return value.toFixed(1);
  }

  function getAirQualityTitle() {
    const airQualityTitles: Record<number, string> = {
      1: 'Bom',
      2: 'Moderado',
      3: 'Insalubre para grupo sensível',
      4: 'Insalubre',
      5: 'Muito prejudicial',
      6: 'Perigoso',
    };

    const airIndex = airData?.usAqi || 1;

    return airQualityTitles[airIndex];
  }

  return (
    <div className={styles.airContainer}>
      <div className={styles.airHeader}>
        <LeafIcon />
        <p>Qualidade do ar</p>
      </div>

      <div className={styles.airContent}>
        <span>{getAirQualityTitle()}</span>
        <p>{airData?.usAqiCount}</p>
      </div>

      <div className={styles.airInfo}>
        <div>
          <p>{parseData(airData?.pm25)}</p>
          <span>PM2.5</span>
        </div>
        <div>
          <p>{parseData(airData?.pm10)}</p>
          <span>PM10</span>
        </div>
        <div>
          <p>{parseData(airData?.so2)}</p>
          <span>sO₂</span>
        </div>
        <div>
          <p>{parseData(airData?.no2)}</p>
          <span>NO₂</span>
        </div>
        <div>
          <p>{parseData(airData?.o3)}</p>
          <span>O₃</span>
        </div>
        <div>
          <p>{parseData(airData?.co)}</p>
          <span>CO</span>
        </div>
      </div>
    </div>
  );
}
