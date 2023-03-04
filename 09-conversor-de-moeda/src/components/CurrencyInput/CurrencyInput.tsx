import { useState } from 'react';

import { Currency } from '@/types/currency';
import { Select } from '../Select/Select';

import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
  currencies: Record<string, Currency>;
  defaultCurrency?: string;
};

export function CurrencyInput({
  currencies,
  defaultCurrency = 'USD',
}: CurrencyInputProps) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>(null);

  function handleCurrencyChange(currency: Currency) {
    setCurrentCurrency(currency);
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span>{currentCurrency?.symbol_native || '$'}</span>
        <input type="number" defaultValue="1" />
      </div>
      <Select
        currencies={currencies}
        onChange={handleCurrencyChange}
        defaultCurrency={defaultCurrency}
      />
    </div>
  );
}
