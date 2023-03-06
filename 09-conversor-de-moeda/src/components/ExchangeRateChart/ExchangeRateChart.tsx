import { useState } from 'react';
import { Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import { ExchangesHistoricalData } from '@/types/currency';

const currencyCode = 'BRL';

import styles from './ExchangeRateChart.module.scss';

type ExchangePeriod = '1D' | '5D' | '1M' | '1Y' | '5Y' | 'MAX';

const exchangePeriods: Record<ExchangePeriod, string> = {
  '1D': '1D',
  '5D': '5D',
  '1M': '1M',
  '1Y': '1A',
  '5Y': '5A',
  MAX: 'Máx',
};

type ExchangeRateChartProps = {
  fromCurrency?: string;
  toCurrency?: string;
  exchangesData: ExchangesHistoricalData;
  onPeriodChange: (period: ExchangePeriod) => void;
  isLoading: boolean;
};

export function ExchangeRateChart({
  exchangesData,
  onPeriodChange,
  isLoading = false,
}: ExchangeRateChartProps) {
  const [currentExchangePeriod, setCurrentExchangePeriod] = useState<ExchangePeriod>('1M');

  function handlePeriodChange(period: ExchangePeriod) {
    return async () => {
      setCurrentExchangePeriod(period);
      onPeriodChange(period);
    };
  }

  const parsedData = Object.keys(exchangesData || []).map((exchangeDate) => ({
    date: exchangeDate,
    value: Number(exchangesData[exchangeDate][currencyCode].toFixed(2)),
  }));

  return (
    <div className={styles.container}>
      <ResponsiveContainer height={300}>
        <ComposedChart
          width={600}
          height={300}
          data={parsedData}
          margin={{
            top: 10,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={styles.highlightColor} stopOpacity={0.5} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <YAxis
            type="number"
            domain={['dataMin', 'dataMax']}
            axisLine={false}
            tickLine={false}
            tickMargin={25}
            tick={{ fontSize: 12 }}
            tickFormatter={(value: number) => value.toLocaleString('pt-BR')}
          />
          <Tooltip />
          <CartesianGrid vertical={false} stroke={styles.graphicElements} />

          <Area
            dataKey="value"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
            stroke={styles.highlightColor}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className={styles.buttonsContainer}>
        {Object.entries(exchangePeriods).map(([periodKey, periodText]) => (
          <button
            type="button"
            key={periodKey}
            className={`${currentExchangePeriod === periodKey && styles.active}`}
            onClick={handlePeriodChange(periodKey as ExchangePeriod)}
            disabled={isLoading}
          >
            {periodText}
          </button>
        ))}
      </div>
    </div>
  );
}
