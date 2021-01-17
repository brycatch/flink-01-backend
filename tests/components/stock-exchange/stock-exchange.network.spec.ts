import axios from "axios";
import database from "../../../src/database";
import { badMockStockExchange1, badMockStockExchange2, badMockStockExchange3, badMockStockExchange4, badMockStockExchange5, badMockStockExchange6, badMockStockExchange7, mockStockExchange, partialMockStockExchange1, partialMockStockExchange2 } from './stock-exchange.utils';

describe("Design - network", () => {
  let stockId1: string, stockId2: string;
  let symbol1: string, symbol2: string;
  const urlBase = "http://localhost:3000/stock-exchange";

  beforeAll(() => {
    database.onlyConnect();
  });

  afterAll(() => {
    database.disconnect();
  });

  describe("POST / ", () => {
    it("Should be create a stock exchange / item 1", () => {
      const stock_exchange = JSON.stringify(mockStockExchange());
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(201);
          expect(data.stock_exchange).toBeDefined();
          expect(data.stock_exchange._id).toBeDefined();
          expect(data.stock_exchange.symbol).toBeDefined();
          stockId1 = data.stock_exchange._id;
          symbol1 = data.stock_exchange.symbol;
        })
        .catch(err => {

          expect(err).toBeUndefined();
        });
    });
    it("Should be create a stock exchange / item 2", () => {
      const mock = mockStockExchange();
      mock.symbol = "$BBB";
      mock.name = "test-02";
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(201);
          expect(data.stock_exchange).toBeDefined();
          expect(data.stock_exchange._id).toBeDefined();
          expect(data.stock_exchange.symbol).toBeDefined();
          stockId2 = data.stock_exchange._id;
          symbol2 = data.stock_exchange.symbol;
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return 400 / symbol already inserted", () => {
      const mock = mockStockExchange();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / incomplete symbol", () => {
      const mock = badMockStockExchange1();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / symbol already inserted", () => {
      const mock = badMockStockExchange2();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / market value without items", () => {
      const mock = badMockStockExchange3();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / bad symbol 1", () => {
      const mock = badMockStockExchange4();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / bad symbol 2", () => {
      const mock = badMockStockExchange5();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / bad symbol 3", () => {
      const mock = badMockStockExchange6();
      const stock_exchange = JSON.stringify(mock);
      return axios
        .post(`${urlBase}/`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
  });


  describe("GET /:id", () => {
    it("Should be return a stock by _id", () => {
      return axios
        .get(`${urlBase}/${stockId1}`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.stock_exchange).toBeDefined();
          expect(stockId1).toBe(data.stock_exchange._id);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return 404 / invalid id", () => {
      return axios
        .get(`${urlBase}/asdasd`)
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(404);
          expect(error.message).toBeDefined();
        });
    });
  });

  describe("GET /list", () => {
    it("Should be return a list of stock exchanges by name", async () => {
      return axios
        .get(`${urlBase}/list?name[]=test`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.stockExchanges.length).toBeGreaterThan(0);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return a list of stock exchanges by name", async () => {
      // %24 = $
      return axios
        .get(`${urlBase}/list?name[]=%24`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.stockExchanges.length).toBeGreaterThan(0);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return a list with one item", async () => {
      return axios
        .get(`${urlBase}/list?name[]=test&limit=1`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.stockExchanges.length).toBe(1);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return an empty list", async () => {
      return axios
        .get(`${urlBase}/list?name[]=asdasd`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.stockExchanges.length).toBe(0);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
  });

  describe("GET /symbol/:symbol", () => {
    it("Should be return a stock by symbol", () => {
      return axios
        .get(`${urlBase}/symbol/${symbol1}`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.stock_exchange).toBeDefined();
          expect(symbol1).toBe(data.stock_exchange.symbol);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return 404 / invalid symbol", () => {
      return axios
        .get(`${urlBase}/symbol/asdasd`)
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(404);
          expect(error.message).toBeDefined();
        });
    });
  });

  describe("PATCH /:id", () => {
    it("Should be update a stock exchange / name", async () => {
      const stock_exchange = JSON.stringify(partialMockStockExchange1());
      return axios
        .patch(`${urlBase}/${stockId1}`, { stock_exchange })
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.updated).toBe(true);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be update a stock exchange / symbol", async () => {
      const stock_exchange = JSON.stringify(partialMockStockExchange2());
      return axios
        .patch(`${urlBase}/${stockId1}`, { stock_exchange })
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.updated).toBe(true);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return 400 / market value without items", async () => {
      const stock_exchange = JSON.stringify(badMockStockExchange3());
      return axios
        .patch(`${urlBase}/${stockId2}`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / bad symbol 1", async () => {
      const stock_exchange = JSON.stringify(badMockStockExchange4());
      return axios
        .patch(`${urlBase}/${stockId2}`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / bad symbol 2", async () => {
      const stock_exchange = JSON.stringify(badMockStockExchange5());
      return axios
        .patch(`${urlBase}/${stockId2}`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / bad symbol 5", async () => {
      const stock_exchange = JSON.stringify(badMockStockExchange6());
      return axios
        .patch(`${urlBase}/${stockId2}`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 400 / symbol already inserted", async () => {
      const stock_exchange = JSON.stringify(partialMockStockExchange2());
      return axios
        .patch(`${urlBase}/${stockId2}`, { stock_exchange })
        .then(response => {
          expect(response).toBeUndefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(400);
          expect(error.message).toBeDefined();
        });
    });
  });

  describe("Remove", () => {
    it("Should be remove a stock exchange - item 1", async () => {
      return axios
        .delete(`${urlBase}/${stockId1}`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.removed).toBe(true);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be remove a stock exchange - item 2", async () => {
      return axios
        .delete(`${urlBase}/${stockId2}`)
        .then(response => {
          expect(response).toBeDefined();
          const { err, code, data } = response.data;
          expect(err).toBe(false);
          expect(code).toBe(200);
          expect(data.removed).toBe(true);
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });
    it("Should be return 404 - element already removed", async () => {
      return axios
        .delete(`${urlBase}/${stockId1}`)
        .then(response => {
          expect(response).toBeDefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(404);
          expect(error.message).toBeDefined();
        });
    });
    it("Should be return 404 - invalid id", async () => {
      return axios
        .delete(`${urlBase}/asdasd`)
        .then(response => {
          expect(response).toBeDefined();
        })
        .catch(e => {
          expect(e).toBeDefined();
          const { err, code, error } = e.response.data;
          expect(err).toBe(true);
          expect(code).toBe(404);
          expect(error.message).toBeDefined();
        });
    });
  });
});

