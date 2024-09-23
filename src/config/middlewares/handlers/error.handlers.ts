import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../../utils/response.utils";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'An unexpected error occurred';

  errorResponse(res, statusCode, message);

  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
};