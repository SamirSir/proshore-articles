import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const exceptionHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch((error: unknown) => next(error));

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  return res.status(err.code).send(err);
}
