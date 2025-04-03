import { Router, Request, Response } from "express";
import { UserEntity } from "../databases/postgres/entity/user.entity";
import { addSuccessWrapper } from "../utils/catchAsync";
import { UserService } from "../services/user.services";
import { useTypeORM } from "../databases/postgres/typeorm";
import { jwtMiddleware } from "../strategy/jwt.strategy";
import { success } from "../utils/errorcodes";

const router = Router();

router
  .get("/", async (req: Request, res: Response) => {
    addSuccessWrapper(res, UserService.getUsers());
  })

  .get("/:id", jwtMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = UserService.getUsersOne(id);

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    success(res,existingProduct);
  })

  .patch("/:id", jwtMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = UserService.getUsersOne(id);

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    const updatedProduct = await UserService.updateUsers(
      id,
      req.body
    );
    success(res,updatedProduct);
  })

  .delete("/:id", jwtMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = await useTypeORM(UserEntity).findOneBy({ id });

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    await useTypeORM(UserEntity).delete({ id: existingProduct.id });
    success(res,{ message: "Product removed!" });
  });

export default router;
