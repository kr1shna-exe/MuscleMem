import type { User } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

export const users: Array<User> = [];

export async function addUser(
  email: string,
  password: string,
  username: string,
): Promise<User> {
  const newUser = {
    email,
    password,
    username,
    id: uuidv4(),
  };
  users.push(newUser);
  return {
    id: newUser.id,
    email: newUser.email,
    username: newUser.username,
    password: newUser.password,
  };
}

export async function findByEmail(email: string) {
  return users.find((user) => user.email == email);
}
