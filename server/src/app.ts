import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';

appSetup(app);
securitySetup(app, express);
routerSetup(app);