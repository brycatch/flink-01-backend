import response from './response.network';
import express from 'express';

const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errCode = err.message || err;

  const regex = new RegExp(/\[(.*)\]\s\[(.*)\]/);

  const group = errCode.match(regex) || [];
  const code = Number(group[1]) || 500;

  const message = group[2] || "Ha ocurrido un error. Por favor intenta de nuevo";
  const error = { message };
  response.create(res, error, code, "error")
};

export default errorHandler;