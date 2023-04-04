import { InputHTMLAttributes } from 'react';

import { QuestionIcon } from '../icons/QuestionIcon';
import { WarningIcon } from '../icons/WarningIcon';

import styles from './TextField.module.scss';

type TextFieldProps = {
  label: string;
  name: string;
  infoText?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, name, infoText, error, ...props }: TextFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label htmlFor={name}>{label}</label>

        <div className={styles.questionContainer}>
          <QuestionIcon />
          {infoText && <span>{infoText}</span>}
        </div>
      </div>

      <input className={styles.input} id={name} name={name} {...props} />

      {error && (
        <div className={styles.errorContainer}>
          <WarningIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
