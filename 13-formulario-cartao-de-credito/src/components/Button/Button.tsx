import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import { SpinnerIcon } from '../icons/SpinnerIcon';

type ButtonProps = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, isLoading = false, ...props }: ButtonProps) {
  return (
    <button className={styles.container} {...props} disabled={props.disabled || isLoading}>
      {isLoading && (
        <span className={styles.spinner} aria-label="Loading spinner">
          <SpinnerIcon />
        </span>
      )}
      {children}
    </button>
  );
}
