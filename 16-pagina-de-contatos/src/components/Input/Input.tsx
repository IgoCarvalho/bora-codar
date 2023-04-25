import { InputHTMLAttributes } from 'react';
import { PatternFormat } from 'react-number-format';

import { SearchIcon } from '../icons/SearchIcon';

import { Container } from './Input.styles';

export type InputProps = {
  icon?: boolean;
  format?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  format,
  type,
  value,
  defaultValue,
  icon = false,
  ...props
}: InputProps) {
  return (
    <Container>
      {icon && <SearchIcon />}
      {format ? (
        <PatternFormat
          format={format}
          value={value as string}
          defaultValue={defaultValue as string}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      )}
    </Container>
  );
}
