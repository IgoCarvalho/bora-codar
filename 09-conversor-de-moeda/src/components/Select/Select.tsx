import { useRef, useState } from 'react';
import CurrencyFlag from 'react-currency-flags';

import { ChevronDown } from '@/assets/icons/ChevronDown';
import { Currency } from '@/types/currency';

import styles from './Select.module.scss';

type SelectProps = {
  currencies: Record<string, Currency>;
  defaultCurrency?: string;
  onChange: (value: Currency) => void;
};

export function Select({
  currencies,
  defaultCurrency = 'USD',
  onChange,
}: SelectProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isOpen = useRef(false);

  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>(
    () => {
      return currencies[defaultCurrency];
    }
  );

  function handleTriggerClick() {
    if (isOpen.current) {
      buttonRef.current?.blur();
      return;
    }

    isOpen.current = true;
  }

  function handleTriggerBlur() {
    isOpen.current = false;
  }

  function handleItemSelect(value: string) {
    return () => {
      setCurrentCurrency(currencies[value]);
      onChange(currencies[value]);
    };
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleTriggerClick}
      onBlur={handleTriggerBlur}
      className={styles.selectContainer}
    >
      <div className={styles.selectLabel}>
        <CurrencyFlag
          className={styles.flag}
          currency={currentCurrency?.code || 'USD'}
        />
        <span>{currentCurrency?.code || 'USD'}</span>
        <ChevronDown />
      </div>

      <ul className={styles.selectOptions}>
        {Object.keys(currencies).map((currency) => (
          <li
            key={currency}
            onClick={handleItemSelect(currency)}
            className={`${styles.selectItem} ${styles.selectLabel}`}
          >
            <CurrencyFlag className={styles.flag} currency={currency} />
            <span>{currencies[currency].code}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}
