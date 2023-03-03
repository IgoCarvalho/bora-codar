import Head from 'next/head';

import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput';
import { ArrowsExchange } from '@/assets/icons/ArrowsExchange';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Conversor de Moedas</title>
        <meta
          name="description"
          content="Aplicação para conversão de moedas e seu histórico"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.card}>
          <h1>Conversor de moedas</h1>

          <div className={styles.currencyInputs}>
            <CurrencyInput />
            <ArrowsExchange />
            <CurrencyInput />
          </div>
        </div>
      </main>
    </>
  );
}
