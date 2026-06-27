import { assets } from "./assets";
import { getPrices } from "./coingecko";
import type { DbPosition } from "./positions";

export type PricedPosition = DbPosition & {
  livePrice: number;
  liveChange24h: number;
};

export async function getLivePricedPositions(
  positions: DbPosition[]
): Promise<PricedPosition[]> {
  const coinIds = positions
    .map((position) => assets[position.symbol as keyof typeof assets])
    .filter(Boolean);

  const prices = await getPrices(coinIds);

  return positions.map((position) => {
    const coinId = assets[position.symbol as keyof typeof assets];
    const liveData = coinId ? prices[coinId] : null;

    return {
      ...position,
      livePrice: liveData?.gbp ?? position.currentPrice,
      liveChange24h: liveData?.gbp_24h_change ?? position.change,
    };
  });
}