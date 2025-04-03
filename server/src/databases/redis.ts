import { createClient } from "redis";

export const rClient = createClient({
  url: "redis://redis:6379",
});

rClient.on("error", (err) => console.error("Redis Client Error", err));

export default async function connectRedis() {
  await rClient.connect();
  try {
    console.log(
      "username:models ",
      await rClient.bf.reserve("username:models", 0.01, 10000)
    );
  } catch (error) {
    console.log("Already Reserved!");
  } finally {
    console.log('\x1b[34m%s\x1b[0m','Redis client Connected!');
  }

  // await rClient.disconnect();
}
