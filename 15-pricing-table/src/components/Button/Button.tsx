import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`
        ${styles.container}
        ${variant === 'primary' && styles.primary}
        ${variant === 'secondary' && styles.secondary}
      `}
      {...props}
    />
  );
}
