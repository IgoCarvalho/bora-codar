import { NextApiRequest, NextApiResponse } from 'next';

import { getExchanges } from '@/services/api';

type ExchangesResponse = {
  data: Record<string, number>;
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const currency = request.query.currency;

  const exchangesResponse: ExchangesResponse = await getExchanges(String(currency));

  return response.status(200).json(exchangesResponse);
}
