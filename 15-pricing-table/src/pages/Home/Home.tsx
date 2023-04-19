import { Button } from '../../components/Button/Button';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.container}>
      <h1>Home Works!</h1>

      <Button>Entrar</Button>
    </div>
  );
}
