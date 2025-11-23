import { Router, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUserSchema } from "../utils/types";
import { addUser, findByEmail } from "../controllers/auth";

export const JWTSECRET = "113";
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const validatedData = createUserSchema.parse(req.body);
  const existingUser = await findByEmail(validatedData.email);
  if (existingUser) {
    return res.status(400).json({ error: "Already have an account" });
  }
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);
  const newUser = await addUser({
    ...validatedData,
    password: hashedPassword,
  });
  const token = jwt.sign(
    { userId: newUser.id, email: validatedData.email } as JwtPayload,
    JWTSECRET,
    {
      expiresIn: "24h",
    },
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 60 * 1000,
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "User Registered Sucessfully",
    user: {
      email: newUser.email,
      username: newUser.username,
    },
  });
});

router.post("/signin", async (req: Request, res: Response) => {
  const validatedData = createUserSchema.parse(req.body);
  const existingUser = await findByEmail(validatedData.email);
  if (!existingUser) {
    return res.status(400).json({ error: "User not registered yet" });
  }
  const isPasswordValid = await bcrypt.compare(
    validatedData.password,
    existingUser.password,
  );
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Incorrect Password" });
  }
  const token = jwt.sign(
    { userId: existingUser.id, email: validatedData.email } as JwtPayload,
    JWTSECRET,
    {
      expiresIn: "24h",
    },
  );
  res.cookie(token, "token", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "User Loggedin Successfully",
    user: {
      email: existingUser.email,
      username: existingUser.username,
    },
  });
});

export default router;
