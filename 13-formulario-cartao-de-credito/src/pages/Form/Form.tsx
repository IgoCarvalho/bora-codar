import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { TextField } from '../../components/TextField/TextField';
import { ShieldCheckIcon } from '../../components/icons/ShieldCheckIcon';
import styles from './Form.module.scss';

export function Form() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form}>
          <div className={styles.formFieldsContainer}>
            <TextField
              label="Número do cartão"
              name="credit-card-number"
              placeholder="**** **** **** ****"
            />

            <TextField
              label="Nome do titular"
              name="cardholder-name"
              placeholder="Nome como está no cartão"
            />

            <div className={styles.formGroup}>
              <TextField label="Validade" name="expiry-date" placeholder="mm/aa" />
              <TextField
                label="CVV"
                name="cvv"
                placeholder="***"
                infoText="O CVV fica, normalmente, no verso do cartão."
              />
            </div>
          </div>

          <div className={styles.cardContainer}>
            <Card />

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
