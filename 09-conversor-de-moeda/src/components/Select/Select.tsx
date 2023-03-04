import { MouseEvent, useRef } from 'react';

import { ChevronDown } from '@/assets/icons/ChevronDown';

import styles from './Select.module.scss';

export function Select() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isOpen = useRef(false);

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
      console.log(value);
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
        <img src="/usa-flag.png" alt="usa flag" />
        <span>USD</span>
        <ChevronDown />
      </div>

      <ul className={styles.selectOptions}>
        <li
          onClick={handleItemSelect('BRL')}
          className={`${styles.selectItem} ${styles.selectLabel}`}
        >
          <img src="/bra-flag.png" alt="bra flag" />
          <span>BRL</span>
        </li>
        <li
          onClick={handleItemSelect('BRL')}
          className={`${styles.selectItem} ${styles.selectLabel}`}
        >
          <img src="/bra-flag.png" alt="bra flag" />
          <span>BRL</span>
        </li>
        <li
          onClick={handleItemSelect('BRL')}
          className={`${styles.selectItem} ${styles.selectLabel}`}
        >
          <img src="/bra-flag.png" alt="bra flag" />
          <span>BRL</span>
        </li>
        <li
          onClick={handleItemSelect('BRL')}
          className={`${styles.selectItem} ${styles.selectLabel}`}
        >
          <img src="/bra-flag.png" alt="bra flag" />
          <span>BRL</span>
        </li>
        <li
          onClick={handleItemSelect('BRL')}
          className={`${styles.selectItem} ${styles.selectLabel}`}
        >
          <img src="/bra-flag.png" alt="bra flag" />
          <span>BRL</span>
        </li>
      </ul>
    </button>
  );
}
