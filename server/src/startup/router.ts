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
          <a href="http://localhost">User</a>
          <a href="http://contributor.localhost">Contributor</a>
          <a href="http://api.localhost/graphql">GQL Playground</a>
        </center>
        `);
    });

export default routerSetup;
