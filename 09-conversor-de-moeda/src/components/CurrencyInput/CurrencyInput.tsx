import { ChangeEvent } from 'react';

import { Currency } from '@/types/currency';
import { Select } from '../Select/Select';

import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
  name: string;
  value: string;
  currency: string;
  currencies: Record<string, Currency>;
  defaultCurrency?: string;
  onChangeValue: (name: string, value: string) => void;
  onChangeCurrency: (name: string, currency: string) => void;
};

export function CurrencyInput({
  name,
  value,
  currency,
  currencies,
  defaultCurrency = 'USD',
  onChangeValue,
  onChangeCurrency,
}: CurrencyInputProps) {
  function handleCurrencyChange(currency: Currency) {
    onChangeCurrency(name, currency.code);
  }

  function handleCurrencyValueChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeValue(name, event.target.value);
  }

  const currentCurrency = currencies[currency];

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span>{currentCurrency.symbol_native || '$'}</span>
        <input
          type="number"
          name={name}
          value={value}
          onChange={handleCurrencyValueChange}
        />
      </div>
      <Select
        currencies={currencies}
        onChange={handleCurrencyChange}
        defaultCurrency={currency}
      />
    </div>
  );
}
