import { IStockExchange } from '../../../src/components/stock-exchange/stock-exchange.interface';

export const mockStockExchange = () => {
  const result: IStockExchange = {
    _id: "",
    name: "test-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit vero reprehenderit a consequatur deleniti nisi debitis totam soluta officia tempore quam rem molestias eius officiis id nobis dolorum, nesciunt deserunt.",
    symbol: "$AA",
    market_values: [
      { value: 100, date: new Date, created: new Date() }
    ],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result;
};

// Update name
export const partialMockStockExchange1 = () => {
  const result: Partial<IStockExchange> = {
    name: "test-02"
  };
  return result as IStockExchange;
};

// Update symbol
export const partialMockStockExchange2 = () => {
  const result: Partial<IStockExchange> = {
    symbol: "$CCC"
  };
  return result;
};

// Incomplete fields - symbol
export const badMockStockExchange1 = () => {
  const result: Partial<IStockExchange> = {
    _id: "",
    name: "test-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit vero reprehenderit a consequatur deleniti nisi debitis totam soluta officia tempore quam rem molestias eius officiis id nobis dolorum, nesciunt deserunt.",
    market_values: [
      { value: 100, date: new Date, created: new Date() }
    ],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result as IStockExchange;
};

// Incomplete fields
export const badMockStockExchange2 = () => {
  const result: Partial<IStockExchange> = {
    _id: "",
    name: "test-01",
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result as IStockExchange;
};

// Market_values without items
export const badMockStockExchange3 = () => {
  const result: IStockExchange = {
    _id: "",
    name: "test-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit vero reprehenderit a consequatur deleniti nisi debitis totam soluta officia tempore quam rem molestias eius officiis id nobis dolorum, nesciunt deserunt.",
    symbol: "$AAA",
    market_values: [],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result as IStockExchange;
};

// Bad symbol 1
export const badMockStockExchange4 = () => {
  const result: IStockExchange = {
    _id: "",
    name: "test-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit vero reprehenderit a consequatur deleniti nisi debitis totam soluta officia tempore quam rem molestias eius officiis id nobis dolorum, nesciunt deserunt.",
    symbol: "as,asd",
    market_values: [
      { value: 100, date: new Date, created: new Date() }
    ],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result;
};

// Bad symbol 2
export const badMockStockExchange5 = () => {
  const result: IStockExchange = {
    _id: "",
    name: "test-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit vero reprehenderit a consequatur deleniti nisi debitis totam soluta officia tempore quam rem molestias eius officiis id nobis dolorum, nesciunt deserunt.",
    symbol: "$ASD,AS",
    market_values: [
      { value: 100, date: new Date, created: new Date() }
    ],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result;
};

// Bad symbol 3
export const badMockStockExchange6 = () => {
  const result: IStockExchange = {
    _id: "",
    name: "test-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit vero reprehenderit a consequatur deleniti nisi debitis totam soluta officia tempore quam rem molestias eius officiis id nobis dolorum, nesciunt deserunt.",
    symbol: "$ASDAAAAAA",
    market_values: [
      { value: 100, date: new Date, created: new Date() }
    ],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result;
};

// Empty fields
export const badMockStockExchange7 = () => {
  const result: IStockExchange = {
    _id: "",
    name: "",
    description: "",
    symbol: "",
    market_values: [],
    created: new Date(),
    modified: new Date(),
    active: true
  }
  return result;
};