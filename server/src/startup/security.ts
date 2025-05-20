import cors from "cors";
import { Express } from "express";
import cookieParser from "cookie-parser";
const securitySetup = (app: Express, express: any) =>
  app
    .use(cookieParser())
    .use(
      "*",
      cors({
        credentials: true,
        origin: "http://localhost",
      })
    )
    .use(express.json())

export default securitySetup;
