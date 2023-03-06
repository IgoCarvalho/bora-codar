import { NextApiRequest, NextApiResponse } from 'next';

import { getHistoricalRequest } from '@/services/api';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { base_currency, currencies, date_from, date_to } = request.query;

  const exchangesHistorical = await getHistoricalRequest(
    String(base_currency),
    String(currencies),
    String(date_from),
    String(date_to)
  );

  return response.status(200).json(exchangesHistorical);
}
