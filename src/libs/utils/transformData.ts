type CryptoData = {
  [key: string]: {
    id: number;
    name: string;
    symbol: string;
    quote: {
      USD: {
        price: number;
        market_cap: number;
        volume_24h: number;
        percent_change_24h: number;
      };
    };
  };
};

export function transformToHistories(userId: number, cryptosData: CryptoData) {
  const histories = Object.values(cryptosData).map((crypto) => {
    const quote = crypto.quote?.USD;

    return {
      userId,
      cryptoId: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: quote?.price ?? 0,
      market_cap: quote?.market_cap ?? 0,
      volume24h: quote?.volume_24h ?? 0,
      percent_change_24h: quote?.percent_change_24h ?? 0,
    };
  });

  return { histories };
}
