import express, { Request, Response, NextFunction } from 'express';
import response from '../../network/response.network';
import controller from './stock-exchange.controller';
import { IStockExchange, TStockExchangeSearch } from './stock-exchange.interface';

const router = express.Router();

router.get("/list", list());
router.get("/symbol/:symbol", get(false));
router.get("/:id", get(true));
router.post("/", create());
router.patch("/:id", patch());
router.delete("/:id", remove());

function list() {
  return (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    console.log(query);
    controller
      .list(query)
      .then(({ data, code, status }) => {
        response.create(res, data, code, status);
      })
      .catch(next);
  };
}

function get(byId: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    const search: TStockExchangeSearch = byId
      ? { _id: req.params.id }
      : { symbol: req.params.symbol }

    controller
      .get(search)
      .then(({ data, code, status }) => {
        response.create(res, data, code, status);
      })
      .catch(next);
  }
};

function create() {
  return (req: Request, res: Response, next: NextFunction) => {
    const iStockExchange: IStockExchange = JSON.parse(req.body.stock_exchange);
    controller
      .create(iStockExchange)
      .then(({ data, code, status }) => {
        response.create(res, data, code, status);
      })
      .catch(next);
  };
}

function patch() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const iStockExchange: Partial<IStockExchange> = JSON.parse(req.body.stock_exchange);
    controller
      .patch(id, iStockExchange)
      .then(({ data, code, status }) => {
        response.create(res, data, code, status);
      })
      .catch(next);
  };
}

function remove() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id: _id } = req.params;
    controller
      .remove(_id)
      .then(({ data, code, status }) => {
        response.create(res, data, code, status);
      })
      .catch(next);
  };
}

export default router;