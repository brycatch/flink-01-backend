import store from '../../../src/components/stock-exchange/stock-exchange.store';
import database from '../../../src/database';
import { mockStockExchange, badMockStockExchange1, badMockStockExchange2, badMockStockExchange3, badMockStockExchange4, badMockStockExchange5, badMockStockExchange6, badMockStockExchange7, partialMockStockExchange1, partialMockStockExchange2 } from './stock-exchange.utils';

describe("Stock exchange - store", () => {
  let stockId1: string;
  let symbol1: string;
  let stockId2: string;
  let symbol2: string;

  beforeAll(() => {
    database.onlyConnect();
  });

  afterAll(() => {
    database.disconnect();
  });

  describe("Create", () => {
    it("Should be create a stock exchange / example 1", async () => {
      const mock = mockStockExchange();
      const result = await store.create(mock);
      expect(result).not.toBeNull();
      if (result) {
        stockId1 = `${result._id}`
        symbol1 = result.symbol;
      }
    });
    it("Should be create a stock exchange / example 2", async () => {
      const mock = mockStockExchange();
      mock.symbol = "$BBB";
      mock.name = "test-02"
      const result = await store.create(mock);
      expect(result).not.toBeNull();
      if (result) {
        stockId2 = `${result._id}`
        symbol2 = result.symbol;
      }
    });
    it("Should be return null / symbol already inserted", async () => {
      const mock = mockStockExchange();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / incomplete symbol", async () => {
      const mock = badMockStockExchange1();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / incomplete fields", async () => {
      const mock = badMockStockExchange2();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / market values without items", async () => {
      const mock = badMockStockExchange3();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / bad symbol 1", async () => {
      const mock = badMockStockExchange4();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / bad symbol 2", async () => {
      const mock = badMockStockExchange5();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / bad symbol 3", async () => {
      const mock = badMockStockExchange6();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
    it("Should be return null / empty fields", async () => {
      const mock = badMockStockExchange7();
      const result = await store.create(mock);
      expect(result).toBeNull();
    });
  });

  describe("Get", () => {
    it("Should be return a stock by _id", async () => {
      const stock = await store.get({ _id: stockId1 });
      expect(stock).not.toBeNull();
    });
    it("Should be return a stock by symbol", async () => {
      const stock = await store.get({ symbol: symbol1 });
      expect(stock).not.toBeNull();
    });
    it("Should be return null / invalid id", async () => {
      const stock = await store.get({ _id: "asdasd" });
      expect(stock).toBeNull();
    });
    it("Should be return null / invalid symbol", async () => {
      const stock = await store.get({ symbol: "asdasd" });
      expect(stock).toBeNull();
    });
    it("Should be return null / empty id", async () => {
      const stock = await store.get({ _id: "" });
      expect(stock).toBeNull();
    });
    it("Should be return null / empty symbol", async () => {
      const stock = await store.get({ symbol: "" });
      expect(stock).toBeNull();
    });
  });

  describe("List", () => {
    it("Should be return a list of stock exchanges by name", async () => {
      const list = await store.list({ name: ["test"] });
      expect(list.length).toBeGreaterThanOrEqual(2);
    });
    it("Should be return a list of stock exchanges by symbol", async () => {
      const list = await store.list({ name: ["$"] });
      expect(list.length).toBeGreaterThanOrEqual(2);
    });
    it("Should be return one item", async () => {
      const list = await store.list({ name: ["test"], limit: 1 });
      expect(list.stockExchanges.length).toBe(1);
    });
    it("Should be return an empty list", async () => {
      const list = await store.list({ name: ["asdasd"] });
      expect(list.stockExchanges.length).toBe(0);
      expect(list.length).toBe(0);
    });
  });

  describe("Patch", () => {
    it("Should be update a stock exchange / name", async () => {
      const mock = partialMockStockExchange1();
      const result = await store.patch(stockId1, mock);
      expect(result).toBe(true);
    });
    it("Should be update a stock exchange / symbol", async () => {
      const mock = partialMockStockExchange2();
      const result = await store.patch(stockId1, mock);
      expect(result).toBe(true);
    });
    it("Should be return false / symbol already inserted", async () => {
      const mock = partialMockStockExchange2();
      const result = await store.patch(stockId2, mock);
      expect(result).toBe(false);
    });
    it("Should be return false / market value without items", async () => {
      const mock = badMockStockExchange3();
      const result = await store.patch(stockId1, mock);
      expect(result).toBe(false);
    });
    it("Should be return false / Bad symbol 1", async () => {
      const mock = badMockStockExchange4();
      const result = await store.patch(stockId1, mock);
      expect(result).toBe(false);
    });
    it("Should be return false / Bad symbol 2", async () => {
      const mock = badMockStockExchange5();
      const result = await store.patch(stockId1, mock);
      expect(result).toBe(false);
    });
    it("Should be return false / Bad symbol 3", async () => {
      const mock = badMockStockExchange6();
      const result = await store.patch(stockId1, mock);
      expect(result).toBe(false);
    });
  });

  describe("Remove", () => {
    it("Should be remove a stock exchange - item 1", async () => {
      const removed = await store.remove(stockId1);
      expect(removed).toBe(true);
    });
    it("Should be remove a stock exchange - item 2", async () => {
      const removed = await store.remove(stockId2);
      expect(removed).toBe(true);
    });
    it("Should return an error - element already removed", async () => {
      const removed = await store.remove(stockId1);
      expect(removed).toBe(false);
    });
    it("Should return an error - invalid id", async () => {
      const removed = await store.remove("");
      expect(removed).toBe(false);
    });
  });
});