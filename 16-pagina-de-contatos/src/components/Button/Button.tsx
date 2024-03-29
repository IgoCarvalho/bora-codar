import { ButtonHTMLAttributes } from 'react';

import { Container } from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <Container {...props} />;
}
