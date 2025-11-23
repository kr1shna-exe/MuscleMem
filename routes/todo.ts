import type { Request, Response } from "express";
import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodosById,
  updateTodo,
  deleteTodo,
} from "../controllers/todo";
import { createTodoSchema, updateTodoSchema } from "../utils/types";
import { authenticateUser } from "../controllers/middleware";

const router = Router();
router.use(authenticateUser);

router.post("/createtodo", async (req: Request, res: Response) => {
  try {
    const validateData = createTodoSchema.parse(req.body);
    const newTodo = await createTodo(req.user!.id, validateData);
    if (!newTodo) {
      return res.status(400).json({ error: "Failed to create todo" });
    }
    return res
      .status(200)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    return res.status(400).json({ error: "Invalid Data" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await deleteTodo(req.user!.id, req.params.id!);
    return res.status(200).json({ message: "Succesfully deleted todo" });
  } catch (error) {
    return res.status(400).json({ error: "Todo deletion failed" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const validateData = updateTodoSchema.parse(req.body);
    const updatedTodo = await updateTodo(
      req.user!.id,
      req.params.id!,
      validateData,
    );
    if (!updateTodo) {
      return res.status(400).json({ message: "Failed to update todo" });
    }
    return res
      .status(200)
      .json({ message: "Successfully updated todo", newTodo: updatedTodo });
  } catch (error) {
    return res.status(400).json({ error: "Invalid Data" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const todos = await getTodos(req.user!.id);
  return res.status(200).json({ message: "Fetched all todos", todos });
});

router.get("/:id", async (req: Request, res: Response) => {
  const todo = await getTodosById(req.user!.id, req.params.id!);
  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }
  return res.status(200).json({ message: "Todo found" });
});

export default router;
