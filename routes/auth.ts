import { Router } from "express";
import type { Response, Request } from "express";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { User } from "../utils/types";
import { addUser, findByEmail } from "../controllers/auth";
import { users } from "../controllers/auth";

const router = Router();
const JWT_SECRET = "123";

const authenticateToken = async (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json("Token Expired");
  }
  const decodedToken = jwt.verify(token, JWT_SECRET) as {
    userId: string;
    email: string;
  };
  const user = await findByEmail(decodedToken.email);
  if (!user) {
    return res.status(400).json("Invalid Token");
  }
  req.user = user;
  next();
};

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, username }: User = req.body;
  const existingUser = await findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "User Already Exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await addUser(email, hashedPassword, username);
  const token = jwt.sign({ userId: user.id, email } as JwtPayload, JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User Created Successfully",
    user: {
      email: user.email,
    },
  });
});

router.post("/signin", async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const user = await findByEmail(email);
  if (!user) {
    return res.status(400).json("User Not Found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json("Incorrect Password");
  }
  const token = jwt.sign({ userId: user.id, email } as JwtPayload, JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User Logged In",
    user: {
      email: user.email,
    },
  });
});
