import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTSECRET } from "../routes/auth";
import { findByEmail } from "./auth";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token Expired" });
  }
  const decodedToken = jwt.verify(token, JWTSECRET) as {
    userId: string;
    email: string;
  };
  const user = await findByEmail(decodedToken.email);
  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }
  req.user = user;
  next();
};
