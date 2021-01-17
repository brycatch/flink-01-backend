import store from './stock-exchange.store';
import { compareAsc, set } from "date-fns";
import { IMarketValue } from './stock-exchange.interface';

const symbol = {
  unique: async (symbol: string, errors: string[]) => {
    const stockExchange = await store.get({ symbol });
    const isInvalid = stockExchange !== null;
    validateError("Symbol - unique", isInvalid, errors);
  },
  update: async (symbol: string, errors: string[]) => {
    const stockExchange = await store.get({ symbol });
    const isInvalid = stockExchange === null;
    validateError("Symbol - update", isInvalid, errors);
  },
}

const marketValue = {
  hasLength: (array: IMarketValue[], errors: string[]) => {
    const isInvalid = array.length === 0;
    validateError("Market value - length", isInvalid, errors);
  },
  elements: (array: IMarketValue[], errors: string[]) => {
    array.forEach((item, index, array) => {
      marketValue.value(item, index, errors);
      marketValue.date(item, index, errors);
    });
  },
  value: (marketValue: IMarketValue, index: number, errors: string[]) => {
    const isInvalid = marketValue.value <= 0;
    validateError(`MarketValue - ${index} - value`, isInvalid, errors);
  },
  date: (marketValue: IMarketValue, index: number, errors: string[]) => {
    const resetTime = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    const today = set(new Date(), resetTime);
    const marketDate = set(marketValue.date, resetTime);
    const isInvalid = compareAsc(marketDate, today) === -1;
    validateError(`MarketValue - ${index} - value`, isInvalid, errors);
  },
};

const validateError = (name: string, isInvalid: boolean, errors: string[]) => {
  if (isInvalid) {
    errors.push(`${name} no es un valor válido`);
  }
}

export default { symbol, marketValue };