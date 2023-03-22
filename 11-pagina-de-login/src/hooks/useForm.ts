import { ChangeEvent, useState } from 'react';

type InputType = 'email';
type ValidationObj = {
  message: string;
  validation: RegExp;
};

const validations: Record<InputType, ValidationObj> = {
  email: {
    message: 'Digite um e-mail válido',
    validation:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
};

export function useForm(type?: InputType) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function validate(value: string) {
    if (!type) return true;

    if (!value.trim().length) {
      setError('Preencha com algum valor');

      return false;
    }

    if (!validations[type].validation.test(value)) {
      setError(validations[type].message);

      return false;
    }

    setError('');
    return true;
  }

  function onBlur() {
    return validate(value);
  }

  return {
    value,
    error,
    validate,
    onChange,
    onBlur,
    register: {
      value,
      onChange,
      onBlur,
    },
  };
}
