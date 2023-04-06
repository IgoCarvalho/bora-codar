import { z } from 'zod';

const dateValidation = z
  .string()
  .nonempty('Campo obrigatório')
  .min(5, 'Insira uma data válida')
  .max(5, 'Insira uma data válida')
  .regex(/^[0-9]{2}\/[0-9]{2}$/, 'Insira uma data válida');

const cvcValidation = z
  .string()
  .nonempty('Campo obrigatório')
  .min(3, 'Insira uma código válido')
  .max(3, 'Insira uma código válido')
  .regex(/^[0-9]{3}$/, 'Insira uma código válido');

const cardNumberValidation = z
  .string()
  .nonempty('Campo obrigatório')
  .regex(/^([0-9]|\s)+$/, 'Insira um número de cartão válido')
  .regex(/^(([0-9]{4}){4}|([0-9]{4}\s){3}[0-9]{4})$/, 'Insira um número de cartão válido')
  .min(16, 'Insira um número de cartão válido')
  .max(19, 'Insira um número de cartão válido');

export const formSchema = z.object({
  cardholderName: z.string().nonempty('Campo obrigatório'),
  cardNumber: cardNumberValidation,
  expiryDate: dateValidation,
  cvc: cvcValidation,
});

export type FormFields = z.infer<typeof formSchema>;
