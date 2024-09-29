import { Request, Response, NextFunction } from "express";

// This middleware ensures that the request content type is application/json
export const ensureJsonContentType = (req: Request, res: Response, next: NextFunction) => {
  if (req.accepts('application/json')) {
    return next();
  }
  res.status(400).json({ message: "Content type must be application/json" });
};
