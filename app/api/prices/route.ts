import { NextResponse } from "next/server";
import { assets } from "../../../lib/assets";
import { getPrices } from "../../../lib/coingecko";

export async function GET() {
  try {
    const coinIds = Object.values(assets);
    const prices = await getPrices(coinIds);

    return NextResponse.json({
      ok: true,
      source: "CoinGecko",
      updatedAt: new Date().toISOString(),
      prices,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}