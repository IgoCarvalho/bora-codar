import { ExchangesHistoricalData } from '@/types/currency';
import { getUTCDate } from '@/utils/getUTCDate';

export async function getCurrencies() {
  const currenciesResponse = await fetch('https://api.freecurrencyapi.com/v1/currencies', {
    headers: {
      apikey: process.env.API_KEY || '',
    },
  });

  return currenciesResponse.json();
}

export async function getExchanges(currency = 'USD', localApi = false) {
  let exchangesResponse: Response;

  if (localApi) {
    exchangesResponse = await fetch(`/api/exchanges/${currency}`);
  } else {
    exchangesResponse = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?base_currency=${currency}`,
      {
        headers: {
          apikey: process.env.API_KEY || '',
        },
      }
    );
  }

  return exchangesResponse.json();
}

export type ExchangePeriod = '1D' | '5D' | '1M' | '1Y' | '5Y' | 'MAX';

const dateFromParser: Record<ExchangePeriod, (date: Date) => Date> = {
  '1D'(date) {
    const dateDay = new Date(date).getDate();
    const newDate = new Date(date).setDate(dateDay - 1);

    return new Date(newDate);
  },
  '5D'(date) {
    const dateDay = new Date(date).getDate();
    const newDate = new Date(date).setDate(dateDay - 5);

    return new Date(newDate);
  },
  '1M'(date) {
    const dateMonth = new Date(date).getMonth();
    const newDate = new Date(date).setMonth(dateMonth - 1);

    return new Date(newDate);
  },
  '1Y'(date) {
    const dateYear = new Date(date).getFullYear();
    const newDate = new Date(date).setFullYear(dateYear - 1);

    return new Date(newDate);
  },
  '5Y'(date) {
    const dateYear = new Date(date).getFullYear();
    const newDate = new Date(date).setFullYear(dateYear - 5);

    return new Date(newDate);
  },
  MAX(date) {
    return new Date(Date.UTC(1999, 0, 2));
  },
};

const formatDate = (originalDate: Date) => {
  const date = getUTCDate(originalDate);

  date.setDate(date.getDate() - 1);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export async function getHistoricalRequest(
  currencyFrom: string,
  currencyTo: string,
  dateFrom: string,
  dateTo: string,
  localApi = false
) {
  const baseUrl = localApi ? '/api/historical' : 'https://api.freecurrencyapi.com/v1/historical';

  const exchangeHistoricalResponse = await fetch(
    `${baseUrl}?base_currency=${currencyFrom}&currencies=${currencyTo}&date_from=${dateFrom}&date_to=${dateTo}&accuracy=minute`,
    {
      headers: {
        apikey: process.env.API_KEY || '',
      },
    }
  );

  return exchangeHistoricalResponse.json();
}

type HistoricalDate = {
  from: Date;
  to: Date;
};

function getHistoricalYears(date: Date, amount: number) {
  const historicalDates: HistoricalDate[] = [];

  let currentDate = date;

  for (let i = 0; i < amount; i++) {
    const oneYearAgo = dateFromParser['1Y'](currentDate);
    historicalDates.push({ from: oneYearAgo, to: currentDate });

    currentDate = oneYearAgo;
  }

  return historicalDates;
}

export async function getHistorical(
  currencyFrom: string,
  currencyTo: string,
  dateTo: Date,
  dateFrom: ExchangePeriod,
  localApi = false
) {
  if (dateFrom === '5Y') {
    const requests = getHistoricalYears(dateTo, 5).map((historicalYear) =>
      getHistoricalRequest(
        currencyFrom,
        currencyTo,
        formatDate(historicalYear.from),
        formatDate(historicalYear.to),
        localApi
      )
    );

    const responses = await Promise.all<{ data: ExchangesHistoricalData }>(requests);

    const historicalResponseData: ExchangesHistoricalData = {};

    responses.forEach((res) => {
      Object.assign(historicalResponseData, res.data);
    });

    return { data: historicalResponseData };
  }

  const parsedDateFrom = dateFromParser[dateFrom](dateTo);

  return getHistoricalRequest(
    currencyFrom,
    currencyTo,
    formatDate(parsedDateFrom),
    formatDate(dateTo),
    localApi
  );
}
