import { Express } from "express";
import mongooseConnect from "../databases/mongodb/mongodb";
import typeORMConnect, { useTypeORM } from "../databases/postgres/typeorm";
import connectRedis from "../databases/redis";
import { networkInterfaces } from "os";
import { Container } from "typedi";
import { UserResolver } from "../resolvers/user/user.resolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
const appSetup = async (app: Express) => {
  try {
    await Promise.all([typeORMConnect(), mongooseConnect(), connectRedis()]);

    const schema = await buildSchema({
      container: Container,
      resolvers: [UserResolver],
    });

    
    const server = new ApolloServer({
      schema
    });

    await server.start();
    const middle = expressMiddleware(server);
    app.use("/graphql", cors(), express.json(), middle as any);

    console.log("\x1b[32m%s\x1b[0m", "Databases connected successfully!");
    const APP_PORT = Number(process.env.APP_PORT) || 5050;

    app.listen(APP_PORT, () => {
      console.group(
        "\x1b[33m%s\x1b[0m",
        `Server started! \n - Go to http://${
          networkInterfaces()["eth0"]![0]!.address
        }:${APP_PORT} \n - Go to http://localhost:${APP_PORT}`
      );
    });
  } catch (error: unknown) {
    console.log("\x1b[31m%s\x1b[0m", "Unable to start the app!");
    console.error(error);
  }
};

export default appSetup;
