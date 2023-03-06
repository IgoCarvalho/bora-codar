export type Currency = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export type CurrenciesData = Record<string, Currency>;
export type ExchangesData = Record<string, number>;
export type ExchangesHistoricalData = Record<string, { [key: string]: number }>;

export type ExchangeHistoricalPeriod = '1D' | '5D' | '1M' | '1Y' | '5Y' | 'MAX';
