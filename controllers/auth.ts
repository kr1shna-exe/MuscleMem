import { v4 as uuidv4 } from "uuid";
import type { User, CreateUser } from "../utils/types";

export const Users: Array<User> = [];

export async function addUser(data: CreateUser) {
  const newUser: User = {
    ...data,
    id: uuidv4(),
  };
  Users.push(newUser);
  return newUser;
}

export async function findByEmail(email: string) {
  return Users.find((user) => user.email == email);
}

export async function deleteUser(id: string) {
  return Users.find((user) => user.id == id);
}
