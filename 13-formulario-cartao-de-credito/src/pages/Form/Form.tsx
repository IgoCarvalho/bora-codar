import { zodResolver } from '@hookform/resolvers/zod';
import { FocusEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { TextField } from '../../components/TextField/TextField';
import { ShieldCheckIcon } from '../../components/icons/ShieldCheckIcon';

import styles from './Form.module.scss';
import { FormFields, formSchema } from './validations';

export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const onFormSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  function handleFormFocus(event: FocusEvent<HTMLFormElement>) {
    if (event.target.name === 'cvc') {
      setIsCardFlipped(true);
      return;
    }

    setIsCardFlipped(false);
  }

  const { cardNumber, cardholderName, cvc, expiryDate } = watch();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onFormSubmit)}
          onFocus={handleFormFocus}
        >
          <div className={styles.formFieldsContainer}>
            <Controller
              control={control}
              name="cardNumber"
              render={({ field: { ref, ...field } }) => (
                <PatternFormat
                  format="#### #### #### ####"
                  customInput={TextField}
                  label="Número do cartão"
                  placeholder="1234 5678 9012 3456"
                  error={errors.cardNumber?.message}
                  getInputRef={ref}
                  {...field}
                />
              )}
            />

            <TextField
              label="Nome do titular"
              placeholder="Nome como está no cartão"
              error={errors.cardholderName?.message}
              {...register('cardholderName')}
            />

            <div className={styles.formGroup}>
              <Controller
                control={control}
                name="expiryDate"
                render={({ field: { ref, ...field } }) => (
                  <PatternFormat
                    format="##/##"
                    customInput={TextField}
                    label="Validade"
                    placeholder="mm/aa"
                    error={errors.expiryDate?.message}
                    getInputRef={ref}
                    {...field}
                  />
                )}
              />

              <TextField
                label="CVV"
                placeholder="***"
                infoText="O CVV fica, normalmente, no verso do cartão."
                error={errors.cvc?.message}
                {...register('cvc')}
              />
            </div>
          </div>

          <div className={styles.cardContainer}>
            <Card
              cardholder={cardholderName}
              cvc={cvc}
              expiryDate={expiryDate}
              number={cardNumber}
              flip={isCardFlipped}
            />

            <p className={styles.cardCertification}>
              <ShieldCheckIcon />
              Seus dados estão seguros
            </p>
          </div>

          <div className={styles.formActionsContainer}>
            <Button type="submit">Adicionar cartão</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
