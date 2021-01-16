// Generic response handling with express
import { Response } from 'express';

/**
 * Generic response handler. Can create an success or error response
 * @param res Response handled in Node
 * @param data Any object or content to return in the response
 * @param code HTTP Code status of the request
 * @param status "success" for an successful result, "error" if the result failed
 * @returns Prepare a response to return with the data received
 */
const create = (res: Response, data: any, code: number, status: "success" | "error") => {
  switch (status) {
    case "success":
      success(res, data, code);
      break;
    case "error":
      error(res, data, code);
      break;
  }
}

/**
 * Create a successful response
 * @param res Response handled in Node
 * @param data Any object or content to return in the response
 * @param code HTTP code status of the request
 * @returns A successful response 
 */
const success = (res: Response, data: any, code: number) => {
  res.status(code).send({ err: false, code, data });
}

/**
 * Create an error response
 * @param res Response handled in Node
 * @param error Any error or content to return in the response
 * @param code HTTP code status of the request
 * @returns An error response
 */
const error = (res: Response, error: any, code: number) => {
  res.status(code).send({ err: true, code, error });
};

export default { create };