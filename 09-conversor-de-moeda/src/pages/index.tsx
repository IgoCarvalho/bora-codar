import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { ArrowsExchange } from '@/assets/icons/ArrowsExchange';
import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput';
import { Currency } from '@/types/currency';

import styles from '@/styles/Home.module.scss';

type HomeProps = {
  currencies: Record<string, Currency>;
  exchanges: Record<string, number>;
};

export default function Home({ currencies, exchanges }: HomeProps) {
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [leftCurrency, setLeftCurrency] = useState('USD');
  const [rightCurrency, setRightCurrency] = useState('BRL');

  const lefInputName = 'left-currency';
  const rightInputName = 'right-currency';

  function handleInputValue(inputName: string, value: string) {
    const exchange = exchanges[rightCurrency];

    if (inputName === lefInputName) {
      setLeftValue(value);

      const rightValueCalculated = Number(value) * exchange;
      setRightValue(rightValueCalculated.toFixed(2));
      console.log(rightValueCalculated);
    } else {
      setRightValue(value);

      const leftValueCalculated = Number(value) / exchange;
      setLeftValue(leftValueCalculated.toFixed(2));
      console.log(leftValueCalculated);
    }
  }

  function handleCurrencyChange(inputName: string, currency: string) {
    let exchange = exchanges[rightCurrency];

    if (inputName === lefInputName) {
      setLeftCurrency(currency);

      // const rightValueCalculated = Number(leftValue) * exchange;
      // setRightValue(rightValueCalculated.toFixed(2));
    } else {
      setRightCurrency(currency);
      exchange = exchanges[currency];

      const rightValueCalculated = Number(leftValue) * exchange;
      setRightValue(rightValueCalculated.toFixed(2));
    }
  }

  useEffect(() => {
    handleInputValue(lefInputName, '1');
  }, []);

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
            <CurrencyInput
              name={lefInputName}
              value={leftValue}
              currency={leftCurrency}
              currencies={currencies}
              defaultCurrency="USD"
              onChangeValue={handleInputValue}
              onChangeCurrency={handleCurrencyChange}
            />
            <ArrowsExchange />
            <CurrencyInput
              name={rightInputName}
              value={rightValue}
              currency={rightCurrency}
              currencies={currencies}
              defaultCurrency="BRL"
              onChangeValue={handleInputValue}
              onChangeCurrency={handleCurrencyChange}
            />
          </div>
        </div>
      </main>
    </>
  );
}

type CurrenciesResponse = {
  data: Record<string, Currency>;
};

type ExchangesResponse = {
  data: Record<string, number>;
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

  const exchangesResponse = await fetch(
    'https://api.freecurrencyapi.com/v1/latest?base_currency=USD',
    {
      headers: {
        apikey: process.env.API_KEY || '',
      },
    }
  );

  const { data: exchangesData }: ExchangesResponse =
    await exchangesResponse.json();

  return {
    props: {
      currencies: currenciesData,
      exchanges: exchangesData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
