import { supabase } from "./supabase";

export type DbPosition = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change: number;
};

type SupabasePosition = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  average_buy_price: number;
  current_price: number;
  change: number;
};

function fromSupabasePosition(position: SupabasePosition): DbPosition {
  return {
    id: position.id,
    asset: position.asset,
    symbol: position.symbol,
    quantity: Number(position.quantity),
    averageBuyPrice: Number(position.average_buy_price),
    currentPrice: Number(position.current_price),
    change: Number(position.change),
  };
}

function toSupabasePosition(position: DbPosition) {
  return {
    id: position.id,
    asset: position.asset,
    symbol: position.symbol,
    quantity: position.quantity,
    average_buy_price: position.averageBuyPrice,
    current_price: position.currentPrice,
    change: position.change,
  };
}

export async function getPositions() {
  const { data, error } = await supabase
    .from("positions")
    .select("*")
    .order("id");

  if (error) {
    throw error;
  }

  return data.map(fromSupabasePosition);
}

export async function savePositions(positions: DbPosition[]) {
  const { error } = await supabase
    .from("positions")
    .upsert(positions.map(toSupabasePosition), { onConflict: "id" });

  if (error) {
    throw error;
  }
}