import { InputHTMLAttributes, MouseEvent, useState } from 'react';

import { EyeIcon } from '../icons/EyeIcon';
import { EyeOffIcon } from '../icons/EyeOffIcon';

import styles from './Input.module.scss';

type InputProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, name, type = 'text', ...props }: InputProps) {
  const [inputType, setInputType] = useState(type);

  function handlePasswordVisibility(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setInputType((state) => (state === 'text' ? 'password' : 'text'));
  }

  const isPassword = type === 'password';
  const isPasswordVisible = inputType === 'text';

  return (
    <div className={styles.container}>
      <div className={styles.inputLabels}>
        <label htmlFor={name}>{label}</label>
        {isPassword && <span>Esqueceu a senha?</span>}
      </div>
      <div className={styles.inputContainer}>
        <input name={name} id={name} type={inputType} {...props} />
        {isPassword && (
          <button
            title={`Visibilidade da senha: ${isPasswordVisible ? 'visível' : 'invisível'}`}
            type="button"
            onClick={handlePasswordVisibility}
          >
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
