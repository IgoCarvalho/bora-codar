import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

import { QuestionIcon } from '../icons/QuestionIcon';
import { WarningIcon } from '../icons/WarningIcon';

import styles from './TextField.module.scss';

type TextFieldProps = {
  label: string;
  name: string;
  infoText?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextFieldBase(
  { label, name, infoText, error, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label htmlFor={name}>{label}</label>

        {!!infoText && (
          <div className={styles.questionContainer}>
            <QuestionIcon />
            <span>{infoText}</span>
          </div>
        )}
      </div>

      <input className={styles.input} id={name} name={name} {...props} ref={ref} />

      {error && (
        <div className={styles.errorContainer}>
          <WarningIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export const TextField = forwardRef(TextFieldBase);
