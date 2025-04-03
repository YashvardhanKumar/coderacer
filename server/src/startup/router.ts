import { Express, Request, Response } from "express";
import githubRouter from "../router/auth/github.router";
import userRouter from "../router/user.router";
import localAuth from "../controllers/auth/auth.controller";

const routerSetup = (app: Express) =>
  app
    .use("/auth/local", localAuth)
    .use("/auth/github", githubRouter)
    
    // .use("/auth/google")
    // .use("/auth/linkedin")
    .use("/users", userRouter)
    .get("/", async (req: Request, res: Response) => {
      res.send(`
        <center>
          HealthCheck OK! 
          <a href="http://localhost:3000">User</a>
          <a href="http://localhost:4000">Contributor</a>
          <a href="http://localhost:5050/graphql">GQL Playground</a>
        </center>
        `);
    });

export default routerSetup;
