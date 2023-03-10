import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import { ArrowsExchange } from '@/assets/icons/ArrowsExchange';
import { CurrencyInput } from '@/components/CurrencyInput/CurrencyInput';
import { ExchangeRateChart } from '@/components/ExchangeRateChart/ExchangeRateChart';
import { ExchangePeriod, getCurrencies, getExchanges, getHistorical } from '@/services/api';
import {
  CurrenciesData,
  ExchangeHistoricalPeriod,
  ExchangesData,
  ExchangesHistoricalData,
} from '@/types/currency';

import styles from '@/styles/Home.module.scss';

type HomeProps = {
  currencies: CurrenciesData;
  exchanges: ExchangesData;
  exchangesHistorical: ExchangesHistoricalData;
};

export default function Home({ currencies, exchanges, exchangesHistorical }: HomeProps) {
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [leftCurrency, setLeftCurrency] = useState('USD');
  const [rightCurrency, setRightCurrency] = useState('BRL');
  const [isLoading, setIsLoading] = useState(false);
  const [currencyExchanges, setCurrencyExchanges] = useState<ExchangesData>(exchanges);
  const [currencyExchangesHistorical, setCurrencyExchangesHistorical] =
    useState<ExchangesHistoricalData>(exchangesHistorical);
  const [currentExchangeHistoricalPeriod, setCurrentExchangeHistoricalPeriod] =
    useState<ExchangeHistoricalPeriod>('1M');

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

      handleExchangesHistoricalChange(currentExchangeHistoricalPeriod, currency, rightCurrency);
    } else {
      setRightCurrency(currency);
      exchange = currencyExchanges[currency];

      const rightValueCalculated = Number(leftValue) * exchange;
      setRightValue(rightValueCalculated.toFixed(2));

      handleExchangesHistoricalChange(currentExchangeHistoricalPeriod, leftCurrency, currency);
    }
  }

  async function handleExchangesHistoricalChange(
    period: ExchangePeriod,
    fromCurrency?: string,
    toCurrency?: string
  ) {
    setCurrentExchangeHistoricalPeriod(period);
    setIsLoading(true);

    try {
      const { data: exchangesHistoricalData }: ExchangeHistoricalResponse = await getHistorical(
        fromCurrency ?? leftCurrency,
        toCurrency ?? rightCurrency,
        new Date(),
        period,
        true
      );

      setCurrencyExchangesHistorical(exchangesHistoricalData);
    } catch {
      alert('Ocorreu algum erro, tente novamente mais tarde!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleInputValue(lefInputName, '1');
  }, []);

  return (
    <>
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
            <h2>Taxa de c??mbio</h2>

            <ExchangeRateChart
              exchangesData={currencyExchangesHistorical}
              onPeriodChange={handleExchangesHistoricalChange}
              exchangeHistoricalPeriod={currentExchangeHistoricalPeriod}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </>
  );
}

type CurrenciesResponse = {
  data: CurrenciesData;
};

type ExchangesResponse = {
  data: ExchangesData;
};

type ExchangeHistoricalResponse = {
  data: ExchangesHistoricalData;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: currenciesData }: CurrenciesResponse = await getCurrencies();

  const { data: exchangesData }: ExchangesResponse = await getExchanges();

  const { data: exchangesHistoricalData }: ExchangeHistoricalResponse = await getHistorical(
    'USD',
    'BRL',
    new Date(),
    '1M'
  );

  return {
    props: {
      currencies: currenciesData,
      exchanges: exchangesData,
      exchangesHistorical: exchangesHistoricalData,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
