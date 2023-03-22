import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import logoImg from '../../assets/images/logo.svg';
import backgroundImg from '../../assets/images/bg.jpg';

import styles from './Login.module.scss';

export function Login() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <img src={logoImg} alt="Vertigo logo" />

        <div className={styles.presentation}>
          <h1>Acesse a plataforma</h1>
          <p>
            Faça login ou registre-se para começar a construir <br />
            seus projetos ainda hoje.
          </p>
        </div>

        <form>
          <div className={styles.formFields}>
            <Input label="E-mail" name="email" type="email" placeholder="Digite seu e-mail" />
            <Input label="Senha" name="password" type="password" placeholder="Digite sua senha" />
          </div>
          <Button>Entrar</Button>

          <div className={styles.formFooter}>
            Ainda não tem uma conta? <a href="#">Inscreva-se</a>
          </div>
        </form>
      </div>

      <div className={styles.background}>
        <img src={backgroundImg} alt="Imagem de Background" />
      </div>
    </main>
  );
}
