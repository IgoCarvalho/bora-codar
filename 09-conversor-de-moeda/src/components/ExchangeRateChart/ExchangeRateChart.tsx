import { Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

type ExchangeData = Record<string, { [key: string]: number }>;

const currencyCode = 'BRL';

const exchangesData: ExchangeData = {
  '2023-02-01': {
    BRL: 5.055009,
  },
  '2023-02-02': {
    BRL: 5.050706,
  },
  '2023-02-03': {
    BRL: 5.15251,
  },
  '2023-02-04': {
    BRL: 5.15181,
  },
  '2023-02-05': {
    BRL: 5.151806,
  },
  '2023-02-06': {
    BRL: 5.147205,
  },
  '2023-02-07': {
    BRL: 5.210806,
  },
  '2023-02-08': {
    BRL: 5.201006,
  },
  '2023-02-09': {
    BRL: 5.29101,
  },
  '2023-02-10': {
    BRL: 5.215605,
  },
  '2023-02-11': {
    BRL: 5.215147,
  },
  '2023-02-12': {
    BRL: 5.215148,
  },
  '2023-02-13': {
    BRL: 5.159908,
  },
  '2023-02-14': {
    BRL: 5.192607,
  },
  '2023-02-15': {
    BRL: 5.21951,
  },
  '2023-02-16': {
    BRL: 5.21831,
  },
  '2023-02-17': {
    BRL: 5.168008,
  },
  '2023-02-18': {
    BRL: 5.16641,
  },
  '2023-02-19': {
    BRL: 5.188574,
  },
  '2023-02-20': {
    BRL: 5.168008,
  },
  '2023-02-21': {
    BRL: 5.168008,
  },
  '2023-02-22': {
    BRL: 5.152709,
  },
  '2023-02-23': {
    BRL: 5.137706,
  },
  '2023-02-24': {
    BRL: 5.210507,
  },
  '2023-02-25': {
    BRL: 5.21041,
  },
  '2023-02-26': {
    BRL: 5.210407,
  },
  '2023-02-27': {
    BRL: 5.201207,
  },
  '2023-02-28': {
    BRL: 5.237308,
  },
  '2023-03-01': {
    BRL: 5.179806,
  },
};

const parsedData = Object.keys(exchangesData).map((exchangeDate) => ({
  date: exchangeDate,
  value: Number(exchangesData[exchangeDate][currencyCode].toFixed(2)),
}));

import styles from './ExchangeRateChart.module.scss';

export function ExchangeRateChart() {
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
    </div>
  );
}
