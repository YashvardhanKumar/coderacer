import { Router, Request, Response } from "express";
import { UserEntity } from "../databases/postgres/entity/user.entity";
import { addSuccessWrapper } from "../utils/catchAsync";
import { UserService } from "../services/user.services";
import { useTypeORM } from "../databases/postgres/typeorm";
import { success } from "../utils/errorcodes";
import { User } from "../controllers/user.controller";
import { authorizedUser } from "../middleware";

const router = Router();

router
  .get("/", authorizedUser, User.getUsers)

  .get("/cur-user", authorizedUser, User.getCurUser)
  .get("/:id", authorizedUser, User.getUsersOne)

  .patch("/:id", authorizedUser, User.updateUser)

  .delete("/:id", authorizedUser, User.deleteUser);

export default router;
