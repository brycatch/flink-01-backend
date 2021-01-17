import store from './stock-exchange.store';
import { IStockExchange, TStockExchangeSearch } from './stock-exchange.interface';
import { IPromiseResult } from '../../network/interface.network';

const create = (iStockExchange: IStockExchange): Promise<IPromiseResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stock_exchange = await store.create(iStockExchange);
      const result: IPromiseResult = stock_exchange
        ? { data: { stock_exchange }, code: 201, status: "success" }
        : { data: { message: "Stock inválido" }, code: 400, status: "error" }
      resolve(result);
    } catch (error) {
      reject("[400] [Stock inválido]");
    }
  });
};

const get = (search: TStockExchangeSearch): Promise<IPromiseResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stock_exchange = await store.get(search);
      const result: IPromiseResult = stock_exchange
        ? { data: { stock_exchange }, code: 200, status: "success" }
        : { data: { message: "Stock no encontrado" }, code: 404, status: "error" };
      resolve(result)
    } catch (error) {
      reject("[404] [Stock no encontrado]")
    }
  });
};

const list = (query: any): Promise<IPromiseResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { length, stockExchanges } = await store.list(query);
      const result: IPromiseResult = { data: { length, stockExchanges }, code: 200, status: "success" };
      resolve(result);
    } catch (error) {
      reject("[404] [Stock no encontrado]")
    }
  });
};

const patch = (_id: string, iStockExchange: Partial<IStockExchange>): Promise<IPromiseResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const updated = await store.patch(_id, iStockExchange)
      const result: IPromiseResult = updated
        ? { data: { updated }, code: 200, status: "success" }
        : { data: { message: "Stock inválido" }, code: 400, status: "error" }
      resolve(result);
    } catch (error) {
      reject("[400] [Stock inválido]");
    }
  });
};

const remove = (_id: string): Promise<IPromiseResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const removed = await store.remove(_id);
      const result: IPromiseResult = removed
        ? { data: { removed }, code: 200, status: "success" }
        : { data: { message: "Stock no encontrado" }, code: 404, status: "error" };
      resolve(result);
    } catch (error) {
      reject("[404] [Stock no encontrado]")
    }
  });
};

export default { create, get, list, patch, remove };