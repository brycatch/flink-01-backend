// Express instance
import express from 'express';
// Routes
import stockExchangeComponent from '../components/stock-exchange/stock-exchange.network';

const routes = (server: express.Application) => {
  server.use("/stock-exchange", stockExchangeComponent);
}

export default routes;