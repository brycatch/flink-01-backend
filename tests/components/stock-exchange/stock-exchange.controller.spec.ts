import controller from "../../../src/components/stock-exchange/stock-exchange.controller";
import database from "../../../src/database";
import { mockStockExchange, badMockStockExchange1, badMockStockExchange2, badMockStockExchange3, badMockStockExchange4, badMockStockExchange5, badMockStockExchange6, badMockStockExchange7, partialMockStockExchange1, partialMockStockExchange2 } from './stock-exchange.utils';

describe("Stock exchange - controller", () => {
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
    it("Should be create a stock exchange / item 1", async () => {
      const mock = mockStockExchange();
      mock.symbol = "$CAA";
      const { data, code, status } = await controller.create(mock);
      expect(data.stock_exchange).not.toBeNull();
      expect(code).toBe(201);
      expect(status).toBe("success");
      if (data.stock_exchange) {
        stockId1 = data.stock_exchange._id;
        symbol1 = data.stock_exchange.symbol;
      }
    });
    it("Should be create a stock exchange / item 2", async () => {
      const mock = mockStockExchange();
      mock.symbol = "$CBBB";
      mock.name = "test-02"
      const { data, code, status } = await controller.create(mock);
      expect(data.stock_exchange).not.toBeNull();
      expect(code).toBe(201);
      expect(status).toBe("success");
      if (data.stock_exchange) {
        stockId2 = data.stock_exchange._id;
        symbol2 = data.stock_exchange.symbol;
      }
    });
    it("Should be return 400 / symbol already inserted", async () => {
      const mock = mockStockExchange();
      mock.symbol = "$CAA";
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / incomplete symbol", async () => {
      const mock = badMockStockExchange1();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / incomplete fields", async () => {
      const mock = badMockStockExchange2();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / market values without items", async () => {
      const mock = badMockStockExchange3();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / bad symbol 1", async () => {
      const mock = badMockStockExchange4();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / bad symbol 2", async () => {
      const mock = badMockStockExchange5();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / bad symbol 3", async () => {
      const mock = badMockStockExchange6();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / empty fields", async () => {
      const mock = badMockStockExchange7();
      const { data, code, status } = await controller.create(mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
  });

  describe("Get", () => {
    it("Should be return a stock by _id", async () => {
      const { data, code, status } = await controller.get({ _id: stockId1 });
      expect(data.stock_exchange).not.toBeNull();
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return a stock by symbol", async () => {
      const { data, code, status } = await controller.get({ symbol: symbol2 });
      expect(data.stock_exchange).not.toBeNull();
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return 404 / invalid id", async () => {
      const { data, code, status } = await controller.get({ _id: "asdasd" });
      expect(data.message).not.toBeNull();
      expect(code).toBe(404);
      expect(status).toBe("error");
    });
    it("Should be return 404 / invalid symbol", async () => {
      const { data, code, status } = await controller.get({ symbol: "asdasd" });
      expect(data.message).not.toBeNull();
      expect(code).toBe(404);
      expect(status).toBe("error");
    });
    it("Should be return 404 / empty id", async () => {
      const { data, code, status } = await controller.get({ _id: "" });
      expect(data.message).not.toBeNull();
      expect(code).toBe(404);
      expect(status).toBe("error");
    });
    it("Should be return 404 / empty symbol", async () => {
      const { data, code, status } = await controller.get({ symbol: "" });
      expect(data.message).not.toBeNull();
      expect(code).toBe(404);
      expect(status).toBe("error");
    });
  });

  describe("List", () => {
    it("Should be return a list of stock exchanges by name", async () => {
      const { data, code, status } = await controller.list({ name: ["test"] });
      expect(data.length).toBeGreaterThan(0);
      expect(data.stockExchanges.length).toBeGreaterThan(0);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return a list of stock exchanges by symbol", async () => {
      const { data, code, status } = await controller.list({ name: ["$"] });
      expect(data.length).toBeGreaterThan(0);
      expect(data.stockExchanges.length).toBeGreaterThan(0);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return one item", async () => {
      const { data, code, status } = await controller.list({ name: ["test"], limit: 1 });
      expect(data.stockExchanges.length).toBe(1);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return an empty list", async () => {
      const { data, code, status } = await controller.list({ name: ["asdasd"] });
      expect(data.length).toBe(0);
      expect(data.stockExchanges.length).toBe(0);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
  });

  describe("Patch", () => {
    it("Should be update a stock exchange / name", async () => {
      const mock = partialMockStockExchange1();
      const { data, code, status } = await controller.patch(stockId1, mock);
      expect(data.updated).toBe(true);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be update a stock exchange / symbol", async () => {
      const mock = partialMockStockExchange2();
      mock.symbol = "$CCCC";
      const { data, code, status } = await controller.patch(stockId1, mock);
      expect(data.updated).toBe(true);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return 400 / symbol already inserted", async () => {
      const mock = partialMockStockExchange2();
      mock.symbol = "$CCCC";
      const { data, code, status } = await controller.patch(stockId2, mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / market value without items", async () => {
      const mock = badMockStockExchange3();
      const { data, code, status } = await controller.patch(stockId2, mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / bad symbol 1", async () => {
      const mock = badMockStockExchange4();
      const { data, code, status } = await controller.patch(stockId2, mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / bad symbol 2", async () => {
      const mock = badMockStockExchange5();
      const { data, code, status } = await controller.patch(stockId2, mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
    it("Should be return 400 / bad symbol 3", async () => {
      const mock = badMockStockExchange6();
      const { data, code, status } = await controller.patch(stockId2, mock);
      expect(data.message).not.toBeNull();
      expect(code).toBe(400);
      expect(status).toBe("error");
    });
  });

  describe("Remove", () => {
    it("Should be remove a stock exchange - item 1", async () => {
      const { data, code, status } = await controller.remove(stockId1);
      expect(data.removed).toBe(true);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be remove a stock exchange - item 2", async () => {
      const { data, code, status } = await controller.remove(stockId2);
      expect(data.removed).toBe(true);
      expect(code).toBe(200);
      expect(status).toBe("success");
    });
    it("Should be return 404 - element already removed", async () => {
      const { data, code, status } = await controller.remove(stockId1);
      expect(data.message).not.toBeNull();
      expect(code).toBe(404);
      expect(status).toBe("error");
    });
    it("Should be return 404 - invalid id", async () => {
      const { data, code, status } = await controller.remove("");
      expect(data.message).not.toBeNull();
      expect(code).toBe(404);
      expect(status).toBe("error");
    });
  });

});
