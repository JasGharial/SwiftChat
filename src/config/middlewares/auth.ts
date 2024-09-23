import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model";

export const getSignedToken = (user: User) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret is not found. Please check environment variables");
  }

  return jwt.sign({ id: user.id },secret, {
    expiresIn: '1d',
  });
}