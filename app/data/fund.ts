export const positions = [
  {
    id: 1,
    asset: "Bitcoin",
    symbol: "BTC",
    quantity: 0.82,
    averageBuyPrice: 62000,
    currentPrice: 73069.68,
    change: 4.2,
  },
  {
    id: 2,
    asset: "Ethereum",
    symbol: "ETH",
    quantity: 12.4,
    averageBuyPrice: 2500,
    currentPrice: 2878.65,
    change: 1.8,
  },
  {
    id: 3,
    asset: "Solana",
    symbol: "SOL",
    quantity: 215,
    averageBuyPrice: 98,
    currentPrice: 88.94,
    change: -2.1,
  },
  {
    id: 4,
    asset: "Cash",
    symbol: "GBP",
    quantity: 12748.33,
    averageBuyPrice: 1,
    currentPrice: 1,
    change: 0,
  },
];

export const calculatedPositions = positions.map((position) => {
  const value = position.quantity * position.currentPrice;
  const costBasis = position.quantity * position.averageBuyPrice;
  const profitLoss = value - costBasis;

  return {
    ...position,
    value,
    costBasis,
    profitLoss,
    profitLossPercent:
      costBasis === 0 ? 0 : (profitLoss / costBasis) * 100,
  };
});

export const totalPortfolioValue = calculatedPositions.reduce(
  (total, position) => total + position.value,
  0
);

export const portfolioWithAllocations = calculatedPositions.map((position) => ({
  ...position,
  allocation:
    totalPortfolioValue === 0
      ? 0
      : (position.value / totalPortfolioValue) * 100,
}));

export const fund = {
  name: "Exit Liquidity Capital",
  subtitle: "Digital Asset Investment Fund",
  nav: totalPortfolioValue,
  dailyChange: 2364,
  dailyChangePercent: 2.63,
  marketMood: "Reasonably Bullish",
};

export const navHistory = [
  { label: "Jan", value: 82000 },
  { label: "Feb", value: 91000 },
  { label: "Mar", value: 87500 },
  { label: "Apr", value: 104000 },
  { label: "May", value: 118000 },
  { label: "Jun", value: totalPortfolioValue },
];

export const trades = [
  {
    id: 1,
    date: "2026-06-24",
    type: "BUY",
    asset: "Bitcoin",
    symbol: "BTC",
    quantity: 0.12,
    price: 65351.67,
    value: 7842.20,
    notes: "Increased conviction following ETF inflows.",
  },
  {
    id: 2,
    date: "2026-06-21",
    type: "SELL",
    asset: "Solana",
    symbol: "SOL",
    quantity: 25,
    price: 124.59,
    value: 3114.80,
    notes: "Reduced position after recent rally.",
  },
  {
    id: 3,
    date: "2026-06-18",
    type: "BUY",
    asset: "Ethereum",
    symbol: "ETH",
    quantity: 1.5,
    price: 3094.67,
    value: 4642.00,
    notes: "Added to core position.",
  },
];