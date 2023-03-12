import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis,
} from 'recharts';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ExchangeHistoricalPeriod, ExchangesHistoricalData } from '@/types/currency';
import { getUTCDate } from '@/utils/getUTCDate';

import styles from './ExchangeRateChart.module.scss';

const exchangePeriods: Record<ExchangeHistoricalPeriod, string> = {
  '1D': '1D',
  '5D': '5D',
  '1M': '1M',
  '1Y': '1A',
  '5Y': '5A',
  MAX: 'Máx',
};

const unavailablePeriods: ExchangeHistoricalPeriod[] = ['MAX'];

type ExchangeRateChartProps = {
  exchangesData: ExchangesHistoricalData;
  onPeriodChange: (period: ExchangeHistoricalPeriod) => void;
  exchangeHistoricalPeriod: ExchangeHistoricalPeriod;
  isLoading?: boolean;
};

const formatNumber = (value: number) => value.toLocaleString('pt-BR');
const formatYAxisValue = (value: number) => value.toLocaleString('pt-BR', { notation: 'compact' });

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    day: '2-digit',
    weekday: 'short',
    year: 'numeric',
  }).format(getUTCDate(payload[0].payload.date));

  const formattedValue = formatNumber(Number(payload[0].value));

  return (
    <div className={styles.customTooltip}>
      <p>{`${formattedValue} ${formattedDate}`}</p>
    </div>
  );
}

export function ExchangeRateChart({
  exchangesData,
  onPeriodChange,
  exchangeHistoricalPeriod,
  isLoading = false,
}: ExchangeRateChartProps) {
  const isMobile = useMediaQuery('(max-width: 425px)');

  function handlePeriodChange(period: ExchangeHistoricalPeriod) {
    return async () => {
      onPeriodChange(period);
    };
  }

  const parsedData = Object.keys(exchangesData || [])
    .sort()
    .map((exchangeDate) => ({
      date: exchangeDate,
      value: Number(Object.values(exchangesData[exchangeDate])[0]),
    }));

  return (
    <div className={styles.container}>
      <ResponsiveContainer height={isMobile ? 160 : 300}>
        <ComposedChart
          width={600}
          height={isMobile ? 160 : 300}
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
            tickMargin={isMobile ? 8 : 25}
            width={isMobile ? 40 : 60}
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxisValue}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid vertical={false} stroke={styles.graphicElements} />

          <Area
            dataKey="value"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
            stroke={styles.highlightColor}
            activeDot={{ stroke: styles.highlightColor }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className={styles.buttonsContainer}>
        {Object.entries(exchangePeriods).map(([periodKey, periodText]) => (
          <button
            type="button"
            key={periodKey}
            className={`${exchangeHistoricalPeriod === periodKey && styles.active}`}
            onClick={handlePeriodChange(periodKey as ExchangeHistoricalPeriod)}
            disabled={
              isLoading ||
              unavailablePeriods.includes(periodKey as ExchangeHistoricalPeriod) ||
              exchangeHistoricalPeriod === periodKey
            }
          >
            {periodText}
          </button>
        ))}
      </div>
    </div>
  );
}
