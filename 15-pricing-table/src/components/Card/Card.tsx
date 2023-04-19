import { Button } from '../Button/Button';
import { CheckIcon } from '../icons/CheckIcon';
import { InfoIcon } from '../icons/InfoIcon';

import styles from './Card.module.scss';

type CardItem = {
  text: string;
  info?: boolean;
};

type CardProps = {
  infoText: string;
  title: string;
  price?: number;
  items: CardItem[];
  actionButtonText?: string;
  mostRecommended?: boolean;
};

export function Card({
  infoText,
  title,
  price,
  items,
  actionButtonText,
  mostRecommended,
}: CardProps) {
  function formatPrice(price: number) {
    const priceFormatter = new Intl.NumberFormat('pt-BR');
    const priceFormatted = priceFormatter.format(price);

    return priceFormatted;
  }

  return (
    <div className={`${styles.container} ${mostRecommended && styles.recommended}`}>
      {mostRecommended && <div className={styles.cardRecommendedBadge}>Mais vantajoso</div>}

      <div className={styles.cardHeader}>
        <p className={styles.cardInfoText}>{infoText}</p>

        <div className={styles.cardHeaderDetails}>
          <strong className={styles.cardTitle}>{title}</strong>

          {!!price && (
            <span className={styles.cardPrice}>
              <span className={styles.currencySymbol}>R$</span>{' '}
              <span className={styles.priceValue}>{formatPrice(price)}</span>/mês
            </span>
          )}
        </div>
      </div>

      <div className={styles.cardActionsContainer}>
        <Button type="button" variant={mostRecommended ? 'secondary' : 'primary'}>
          {actionButtonText || 'Assinar agora'}
        </Button>
      </div>

      <hr />

      <ul className={styles.cardItemsList}>
        {items.map(({ text: itemText, info: itemInfo = true }) => (
          <li className={styles.cardItem} key={itemText}>
            <div className={styles.checkIcon}>
              <CheckIcon />
            </div>
            <span className={styles.cardItemText}>{itemText}</span>

            {itemInfo && (
              <div className={styles.infoIcon}>
                <InfoIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
