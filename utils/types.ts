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

export const createTodoSchema = z.object({
  title: z.string().min(4, "Atleast 4 characters"),
  description: z.string(),
  completed: z.boolean().default(false),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

const todoSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type User = z.infer<typeof userSchema>;
export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
export type Todo = z.infer<typeof todoSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
