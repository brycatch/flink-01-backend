export type TStockExchangeSearch = { _id: string } | { symbol: string };

export interface IMarketValue {
  value: number;
  date: Date,
  created: Date
}

export interface IStockExchange {
  _id: string;
  name: string;
  description: string;
  symbol: string;
  market_values: IMarketValue[],
  created: Date,
  modified: Date,
  active: boolean
}