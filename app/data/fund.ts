export const fund = {
  name: "Exit Liquidity Capital",
  subtitle: "Digital Asset Investment Fund",
  nav: 127483.28,
  dailyChange: 2364,
  dailyChangePercent: 2.63,
  marketMood: "Reasonably Bullish",
  bestPerformer: "Bitcoin",
  worstPerformer: "Solana",
};

export const positions = [
  {
    asset: "Bitcoin",
    symbol: "BTC",
    quantity: 0.82,
    averageBuyPrice: 62000,
    currentPrice: 73069.68,
    change: 4.2,
  },
  {
    asset: "Ethereum",
    symbol: "ETH",
    quantity: 12.4,
    averageBuyPrice: 2500,
    currentPrice: 2878.65,
    change: 1.8,
  },
  {
    asset: "Solana",
    symbol: "SOL",
    quantity: 215,
    averageBuyPrice: 98,
    currentPrice: 88.94,
    change: -2.1,
  },
  {
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
  const profitLossPercent = (profitLoss / costBasis) * 100;

  return {
    ...position,
    value,
    costBasis,
    profitLoss,
    profitLossPercent,
  };
});

export const totalPortfolioValue = calculatedPositions.reduce(
  (total, position) => total + position.value,
  0
);

export const portfolioWithAllocations = calculatedPositions.map((position) => ({
  ...position,
  allocation: (position.value / totalPortfolioValue) * 100,
}));

export const navHistory = [
  { label: "Jan", value: 82000 },
  { label: "Feb", value: 91000 },
  { label: "Mar", value: 87500 },
  { label: "Apr", value: 104000 },
  { label: "May", value: 118000 },
  { label: "Jun", value: 127483 },
];

export const trades = [
  {
    date: "2026-06-24",
    asset: "Bitcoin",
    symbol: "BTC",
    action: "Conviction Increased",
    quantity: "0.12",
    value: "£7,842.20",
  },
  {
    date: "2026-06-21",
    asset: "Solana",
    symbol: "SOL",
    action: "Conviction Reassessed",
    quantity: "25",
    value: "£3,114.80",
  },
  {
    date: "2026-06-18",
    asset: "Ethereum",
    symbol: "ETH",
    action: "Conviction Increased",
    quantity: "1.5",
    value: "£4,642.00",
  },
];