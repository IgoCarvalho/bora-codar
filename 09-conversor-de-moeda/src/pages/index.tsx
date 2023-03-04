import { GetStaticProps } from 'next';
import Head from 'next/head';

import { ArrowsExchange } from '@/assets/icons/ArrowsExchange';
import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput';
import { Currency } from '@/types/currency';

import styles from '@/styles/Home.module.scss';

type HomeProps = {
  currencies: Record<string, Currency>;
};

export default function Home({ currencies }: HomeProps) {
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
            <CurrencyInput currencies={currencies} defaultCurrency="USD" />
            <ArrowsExchange />
            <CurrencyInput currencies={currencies} defaultCurrency="BRL" />
          </div>
        </div>
      </main>
    </>
  );
}

type CurrenciesResponse = {
  data: Record<string, Currency>;
};

export const getStaticProps: GetStaticProps = async () => {
  const currenciesResponse = await fetch(
    'https://api.freecurrencyapi.com/v1/currencies',
    {
      headers: {
        apikey: process.env.API_KEY || '',
      },
    }
  );
  const { data: currenciesData }: CurrenciesResponse =
    await currenciesResponse.json();

  return {
    props: {
      currencies: currenciesData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
