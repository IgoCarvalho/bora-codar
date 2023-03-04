export async function getCurrencies() {
  const currenciesResponse = await fetch(
    'https://api.freecurrencyapi.com/v1/currencies',
    {
      headers: {
        apikey: process.env.API_KEY || '',
      },
    }
  );

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
