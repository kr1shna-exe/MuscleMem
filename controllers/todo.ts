import type { CreateTodo, Todo, UpdateTodo } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

// export const Todos: Array<Todo> = [];
export const Todos = new Map<string, Todo>();

export async function createTodo(userId: string, data: CreateTodo) {
  const newTodo: Todo = {
    id: uuidv4(),
    userId,
    title: data.title,
    description: data.description,
    completed: data.completed,
  };
  // Todos.push(newTodo);
  Todos.set(newTodo.id, newTodo);
  return Todos;
}

export async function getTodos(userId: string) {
  // return Todos.filter((todo) => todo.userId == userId);
  return Array.from(Todos.values()).filter((todo) => todo.userId == userId);
}

export async function getTodosById(userId: string, todoId: string) {
  // return Todos.find((todo) => todo.userId == userId && todo.id == todoId);
  return Todos.get(todoId);
}

export async function updateTodo(
  userId: string,
  todoId: string,
  data: UpdateTodo,
) {
  // const todoIdx = Todos.findIndex(
  //   (todo) => todo.userId == userId && todo.id == todoId,
  // );
  // Todos[todoIdx] = {
  //   ...Todos[todoIdx],
  //   ...data,
  // } as Todo;
  const todo = Todos.get(todoId);
  Todos.set(todoId, { ...todo, ...data } as Todo);
}

export async function deleteTodo(userId: string, todoId: string) {
  // const idx = Todos.findIndex(
  //   (todo) => todo.id == todoId && todo.userId == userId,
  // );
  // Todos.splice(index, 1);
  return Todos.delete(todoId);
}
