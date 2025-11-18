import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Invalid Email Format"),
  password: z.string().min(4, "Password should have a minimum of 4 characters"),
  username: z.string().min(6, "Minimum of 6 characters is required"),
});

const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  password: z.string(),
  username: z.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type User = z.infer<typeof userSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
