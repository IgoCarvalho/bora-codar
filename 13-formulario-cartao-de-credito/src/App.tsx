import { Button } from './components/Button/Button';
import { TextField } from './components/TextField/TextField';

export function App() {
  return (
    <div>
      <h1>Ola Mundo</h1>

      <TextField
        label="Número do cartão"
        name="credit-card-number"
        placeholder="**** **** **** ****"
        infoText="Texto auxiliar informativo!"
        error="Insira um número de cartão válido"
      />

      <Button>Adicionar cartão</Button>
    </div>
  );
}
