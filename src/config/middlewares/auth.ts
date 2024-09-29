import jwt from "jsonwebtoken";
import { User } from "@/config/db/models/user.model";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { cookieName } from "@/config/application";
import { errorResponse } from "@/utils/response.utils";

interface JwtPayload { // Define a specific interface for the payload
  id: string;
}

export const getSignedToken = (user: User) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret is not found. Please check environment variables");
  }

  return jwt.sign({ id: user.id },secret, {
    expiresIn: '1d',
  });
}

export const validateJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET;
  const token = req.cookies[cookieName]

  if (!secret) {
    throw new Error("JWT Secret is not found. Please check environment variables");
  }

  if (!token) {
    return errorResponse(res, 401, "Session not present or expired. Please login again");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = (decoded as JwtPayload).id; // Assign userId from decoded payload
    next();
  } catch (err) {
    return errorResponse(res, 403, 'Token is not valid. Please login again');
  }
}
