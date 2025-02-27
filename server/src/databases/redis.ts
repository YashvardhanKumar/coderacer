import { createClient } from "redis";

export const rClient = createClient({
  url: "redis://redis:6379",
});

export default async function connectRedis() {
  await rClient.connect();
}
