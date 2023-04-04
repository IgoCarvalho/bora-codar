import cardBgBackImg from '../../assets/images/card-bg-back.jpg';
import cardBgImg from '../../assets/images/card-bg.jpg';
import { ContactlessIcon } from '../icons/ContactlessIcon';
import { VisaFlagIcon } from '../icons/VisaFlagIcon';

import styles from './Card.module.scss';

export function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardFront}>
            <div className={styles.cardFrontContent}>
              <div className={styles.cardFrontHeader}>
                <VisaFlagIcon />
                <ContactlessIcon />
              </div>

              <div className={styles.cardFrontInfo}>
                <p className={styles.cardNumber}>
                  <span>4716</span>
                  <span>8039</span>
                  <span>02••</span>
                  <span>••••</span>
                </p>

                <p className={styles.cardUserName}>Seu nome aqui</p>

                <span className={styles.cardExpireDate}>••/••</span>
              </div>
            </div>
            <img width={280} height={168} src={cardBgImg} alt="Credit card" />
          </div>
          <div className={styles.cardBack}>
            <div className={styles.cardBackContent}>
              <div className={styles.cardCvc}>
                <p>123</p>
                <span>CVV</span>
              </div>
            </div>

            <img width={280} height={168} src={cardBgBackImg} alt="Credit card back" />
          </div>
        </div>
      </div>
    </div>
  );
}
