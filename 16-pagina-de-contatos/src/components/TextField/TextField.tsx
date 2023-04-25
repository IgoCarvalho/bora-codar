import { Input, InputProps } from '../Input/Input';

import { Container } from './TextField.styles';

type TextFieldProps = {
  label: string;
  name: string;
} & InputProps;

export function TextField({ label, name, ...props }: TextFieldProps) {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <Input id={name} name={name} {...props} />
    </Container>
  );
}
