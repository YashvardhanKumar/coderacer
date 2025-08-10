import { Router, Request, Response } from 'express';
import { useTypeORM } from '../../databases/postgres/typeorm';
import { UserEntity } from '../../databases/postgres/entity/user.entity';

const controller = Router();

controller

  .post('/', async (req: Request, res: Response) => {
    const product = new UserEntity();
    product.name = req.body.name;
    product.avatar = req.body.image;
    // product.price = req.body.price;
    product.summary = req.body.description;

    const newProduct = await useTypeORM(UserEntity).save(product);
    res.status(201).send(newProduct);
  })

  .get('/', async (req: Request, res: Response) => {
    const products = await useTypeORM(UserEntity).find();
    res.send(products);
  })

  .get('/:id', async (req: Request, res: Response) => {
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

    res.send(existingProduct);
  })

  .patch('/:id', async (req: Request, res: Response) => {
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

    const changes: Partial<UserEntity> = req.body;
    const productChanges = { ...existingProduct, ...changes };

    const updatedProduct = await useTypeORM(UserEntity).save(productChanges);
    res.send(updatedProduct);
  })

  .delete('/:id', async (req: Request, res: Response) => {
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

    await useTypeORM(UserEntity).remove(existingProduct);
    res.send({ message: 'Product removed!' });
  });

export default controller;
