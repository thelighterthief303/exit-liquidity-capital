export async function getPrices(ids: string[]) {
  const uniqueIds = [...new Set(ids)].filter(Boolean);

  if (uniqueIds.length === 0) {
    return {};
  }

  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueIds.join(",")}` +
    "&vs_currencies=gbp&include_24hr_change=true";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch CoinGecko prices");
  }

  return response.json();
}