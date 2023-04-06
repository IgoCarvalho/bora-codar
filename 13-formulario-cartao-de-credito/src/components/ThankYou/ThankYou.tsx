import { Button } from '../Button/Button';
import { CompleteIcon } from '../icons/CompleteIcon';

import styles from './ThankYou.module.scss';

type ThankYouProps = {
  onContinue: () => void;
};

export function ThankYou({ onContinue }: ThankYouProps) {
  function handleContinueClick() {
    onContinue();
  }

  return (
    <div className={styles.container}>
      <CompleteIcon />

      <strong className={styles.title}>Obrigado!</strong>

      <p className={styles.description}>Nós adicionamos as informações de seu cartão</p>

      <div className={styles.actionsContainer}>
        <Button type="button" onClick={handleContinueClick}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
