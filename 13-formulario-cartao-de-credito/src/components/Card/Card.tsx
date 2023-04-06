import cardBgBackImg from '../../assets/images/card-bg-back.jpg';
import cardBgImg from '../../assets/images/card-bg.jpg';
import { ContactlessIcon } from '../icons/ContactlessIcon';

import styles from './Card.module.scss';
import { getCardFlag } from './getCardFlag';

type CardProps = {
  number: string;
  cvc: string;
  cardholder: string;
  expiryDate: string;
  flip?: boolean;
};

export function Card({ number, cardholder, cvc, expiryDate, flip = false }: CardProps) {
  function formatCardNumber() {
    const filledNumber = number.replace(/\s/g, '').padEnd(16, '•');

    const numberFormatted = filledNumber
      .slice(0, 16)
      .split(/(.{0,4})/)
      .filter((item) => !!item)
      .map((item, i) => <span key={item + i}>{item}</span>);

    return numberFormatted;
  }

  function formatExpiryDate() {
    const filledDate = expiryDate.replace(/\D/g, '').padEnd(4, '•').slice(0, 4);

    const dateFormatted = filledDate.replace(/(.{2})/, (date) => date.concat('/')).trim();

    return dateFormatted;
  }

  function formatCvc() {
    const filledCode = cvc.padEnd(3, '•').slice(0, 3);

    return filledCode;
  }

  const cardNumber = formatCardNumber();
  const formattedExpiryDate = formatExpiryDate();
  const cardCvc = formatCvc();
  const CardFlag = getCardFlag(number);

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${flip && styles.flip}`}>
          <div className={styles.cardFront}>
            <div className={styles.cardFrontContent}>
              <div className={styles.cardFrontHeader}>
                {CardFlag ? <CardFlag /> : <div></div>}
                <ContactlessIcon />
              </div>

              <div className={styles.cardFrontInfo}>
                <p className={styles.cardNumber}>{cardNumber}</p>

                <p className={styles.cardUserName}> {cardholder ? cardholder : 'Seu nome aqui'}</p>

                <span className={styles.cardExpireDate}>{formattedExpiryDate}</span>
              </div>
            </div>
            <img width={280} height={168} src={cardBgImg} alt="Credit card" />
          </div>
          <div className={styles.cardBack}>
            <div className={styles.cardBackContent}>
              <div className={styles.cardCvc}>
                <p>{cardCvc}</p>
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
