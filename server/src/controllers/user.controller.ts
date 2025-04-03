import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { addSuccessWrapper } from "../utils/catchAsync";
import { success } from "../utils/errorcodes";

export class User {
  static async getUsers(req: Request, res: Response) {
    addSuccessWrapper(res, await UserService.getUsers());
  }

  static async getUsersOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = await UserService.getUsersOne(id);

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    success(res, existingProduct);
  }

  // cur-user
  static async getCurUser(req: Request, res: Response) {
    console.log(req.user);    
    const id = req.user.userId;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = await UserService.getUsersOne(id);

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    success(res, {});
  }
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = await UserService.getUsersOne(id);

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    const updatedProduct = await UserService.updateUsers(id, req.body);
    success(res, updatedProduct);
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ message: 'Required parameter "id" is missing!' });
      return;
    }

    const existingProduct = await UserService.getUsersOne(id);

    if (!existingProduct) {
      res
        .status(404)
        .send({ message: `Product with id: ${id} was not found.` });
      return;
    }

    await UserService.deleteUser(id);
    success(res, { message: "Product removed!" });
  }
}
