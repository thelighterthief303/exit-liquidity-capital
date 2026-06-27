export async function getPrices(ids: string[]) {
  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}` +
    "&vs_currencies=gbp&include_24hr_change=true";

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch CoinGecko prices");
  }

  return response.json();
}