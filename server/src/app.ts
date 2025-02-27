import express from "express";
import dotenvx from "@dotenvx/dotenvx";

import appSetup from "./startup/init";
import routerSetup from "./startup/router";
import securitySetup from "./startup/security";
import path from "path";

const app = express();

dotenvx.config({
  path: [`.env.${process.env.NODE_ENV}`],
});

void appSetup(app);
securitySetup(app, express);
routerSetup(app);
