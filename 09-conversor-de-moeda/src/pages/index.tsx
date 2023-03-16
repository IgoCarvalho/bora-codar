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

  async function updateCurrencyExchanges(currency: string) {
    const { data: exchangesData }: ExchangesResponse = await getExchanges(currency, true);
    setCurrencyExchanges(exchangesData);

    return exchangesData;
  }

  async function handleCurrencyChange(inputName: string, currency: string) {
    let exchange: number;

    try {
      setIsLoading(true);

      if (inputName === lefInputName) {
        const newExchangesData = await updateCurrencyExchanges(currency);

        const newRightCurrency = currency === rightCurrency ? leftCurrency : rightCurrency;

        setLeftCurrency(currency);
        setRightCurrency(newRightCurrency);

        exchange = newExchangesData[newRightCurrency];
        const rightValueCalculated = Number(leftValue) * exchange;

        setRightValue(rightValueCalculated.toFixed(2));

        handleExchangesHistoricalChange(
          currentExchangeHistoricalPeriod,
          currency,
          newRightCurrency
        );
      } else {
        const newLeftCurrency = currency === leftCurrency ? rightCurrency : leftCurrency;

        exchange = currencyExchanges[currency];

        if (currency === leftCurrency) {
          const newExchangesData = await updateCurrencyExchanges(newLeftCurrency);
          exchange = newExchangesData[currency];
        }

        setLeftCurrency(newLeftCurrency);
        setRightCurrency(currency);

        const rightValueCalculated = Number(leftValue) * exchange;
        setRightValue(rightValueCalculated.toFixed(2));

        handleExchangesHistoricalChange(currentExchangeHistoricalPeriod, newLeftCurrency, currency);
      }
    } catch (e) {
      console.log(e);

      alert('Ocorreu algum erro, tente novamente mais tarde!');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExchangesHistoricalChange(
    period: ExchangePeriod,
    fromCurrency?: string,
    toCurrency?: string
  ) {
    setCurrentExchangeHistoricalPeriod(period);
    setIsLoading(true);

    const { data: exchangesHistoricalData }: ExchangeHistoricalResponse = await getHistorical(
      fromCurrency ?? leftCurrency,
      toCurrency ?? rightCurrency,
      new Date(),
      period,
      true
    );

    setCurrencyExchangesHistorical(exchangesHistoricalData);
    setIsLoading(false);
  }

  function handleExchangesSwitch() {
    if (isLoading) return;

    handleCurrencyChange(lefInputName, rightCurrency);
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
            <ArrowsExchange onClick={handleExchangesSwitch} />
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
