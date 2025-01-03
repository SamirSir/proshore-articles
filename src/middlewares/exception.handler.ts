import { NextFunction, Request, Response } from 'express';

export const exceptionHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));

export function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  return res.status(err.code).send(err);
}
