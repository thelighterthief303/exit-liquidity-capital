import { assets } from "./assets";
import type { DbPosition } from "./positions";

type PriceApiResponse = {
  ok: boolean;
  source?: string;
  updatedAt?: string;
  prices?: Record<
    string,
    {
      gbp: number;
      gbp_24h_change: number;
    }
  >;
  error?: string;
};

export type PricedPosition = DbPosition & {
  livePrice: number;
  liveChange24h: number;
};

export async function getLivePricedPositions(
  positions: DbPosition[]
): Promise<PricedPosition[]> {
  const response = await fetch("/api/prices");

  if (!response.ok) {
    throw new Error("Price API request failed");
  }

  const data: PriceApiResponse = await response.json();

  if (!data.ok || !data.prices) {
    throw new Error(data.error || "Price API returned no prices");
  }

  return positions.map((position) => {
    const coinId = assets[position.symbol as keyof typeof assets];
    const liveData = coinId ? data.prices?.[coinId] : null;

    return {
      ...position,
      livePrice: liveData?.gbp ?? position.currentPrice,
      liveChange24h: liveData?.gbp_24h_change ?? position.change,
    };
  });
}