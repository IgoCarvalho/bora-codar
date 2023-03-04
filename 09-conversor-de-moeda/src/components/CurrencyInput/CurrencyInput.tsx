import { Select } from '../Select/Select';

import styles from './CurrencyInput.module.scss';

export function CurrencyInput() {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span>$</span>
        <input type="number" defaultValue="1" />
      </div>
      <Select />
    </div>
  );
}
