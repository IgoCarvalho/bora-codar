import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { ArrowsExchange } from '@/assets/icons/ArrowsExchange';
import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput';
import { ExchangeRateChart } from '@/components/ExchangeRateChart/ExchangeRateChart';
import { getCurrencies, getExchanges } from '@/services/api';
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
  const [isLoading, setIsLoading] = useState(false);
  const [currencyExchanges, setCurrencyExchanges] = useState<HomeProps['exchanges']>(exchanges);

  const lefInputName = 'left-currency';
  const rightInputName = 'right-currency';

  function handleInputValue(inputName: string, value: string) {
    const exchange = currencyExchanges[rightCurrency];

    if (inputName === lefInputName) {
      setLeftValue(value);

      const rightValueCalculated = Number(value) * exchange;
      setRightValue(rightValueCalculated.toFixed(2));
    } else {
      setRightValue(value);

      const leftValueCalculated = Number(value) / exchange;
      setLeftValue(leftValueCalculated.toFixed(2));
    }
  }

  async function handleCurrencyChange(inputName: string, currency: string) {
    let exchange = currencyExchanges[rightCurrency];

    if (inputName === lefInputName) {
      setLeftCurrency(currency);
      setIsLoading(true);

      const { data: exchangesData }: ExchangesResponse = await getExchanges(currency, true);

      setCurrencyExchanges(exchangesData);

      exchange = exchangesData[rightCurrency];
      const rightValueCalculated = Number(leftValue) * exchange;

      setRightValue(rightValueCalculated.toFixed(2));
      setIsLoading(false);
    } else {
      setRightCurrency(currency);
      exchange = currencyExchanges[currency];

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
        <meta name="description" content="Aplicação para conversão de moedas e seu histórico" />
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
              onChangeValue={handleInputValue}
              onChangeCurrency={handleCurrencyChange}
              disabled={isLoading}
            />
            <ArrowsExchange />
            <CurrencyInput
              name={rightInputName}
              value={rightValue}
              currency={rightCurrency}
              currencies={currencies}
              onChangeValue={handleInputValue}
              onChangeCurrency={handleCurrencyChange}
              disabled={isLoading}
            />
          </div>

          <div className={styles.chartContainer}>
            <h2>Taxa de câmbio</h2>

            <ExchangeRateChart />
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
  const { data: currenciesData }: CurrenciesResponse = await getCurrencies();

  const { data: exchangesData }: ExchangesResponse = await getExchanges();

  return {
    props: {
      currencies: currenciesData,
      exchanges: exchangesData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
