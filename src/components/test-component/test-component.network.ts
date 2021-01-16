import express, { Request, Response, NextFunction } from 'express';
import response from '../../network/response.network';

const router = express.Router();

router.get("/", get());

function get() {
  return (req: Request, res: Response, next: NextFunction) => {
    response.create(res, { message: "Hello world" }, 200, "success");
  }
}

export default router;