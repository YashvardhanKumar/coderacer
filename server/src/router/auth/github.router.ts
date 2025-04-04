import { Router } from "express";
import { Github } from "../../services/auth/github.services";
import { authorizedUser } from "../../middleware";


const router = Router();

router.post('/',Github.authorize)
    .get('/oauth2callback',Github.callback)
    .post('/credentials',Github.getGithubCredentials);


export default router;