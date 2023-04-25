import { InputHTMLAttributes } from 'react';

import { SearchIcon } from '../icons/SearchIcon';

import { Container } from './Input.styles';

export type InputProps = {
  icon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ icon = false, ...props }: InputProps) {
  return (
    <Container>
      {icon && <SearchIcon />}
      <input type="text" {...props} />
    </Container>
  );
}
