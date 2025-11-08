import { createClient } from "redis";

export const redis_client = createClient({
  url: "redis://localhost:6379",
});
