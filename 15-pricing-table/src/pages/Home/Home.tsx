import { Card } from '../../components/Card/Card';

import styles from './Home.module.scss';

export function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Card
          infoText="Para você começar"
          title="Essentials"
          price={19.97}
          items={[{ text: 'Até 3 usuários' }, { text: 'Autoatendimento' }]}
        />

        <Card
          infoText="Para você decolar"
          title="Ultimate"
          price={29.97}
          items={[
            { text: 'Usuários ilimitados' },
            { text: 'Suporte 24/7' },
            { text: 'CSM Dedicado' },
            { text: 'Treinamentos' },
          ]}
          mostRecommended
        />

        <Card
          infoText="Para sua empresa"
          title="Enterprise"
          items={[
            {
              text: 'Plano customizado especialmente para a necessidade de seu negocio',
              info: false,
            },
          ]}
          actionButtonText="Fale com a gente"
        />
      </div>
    </main>
  );
}
