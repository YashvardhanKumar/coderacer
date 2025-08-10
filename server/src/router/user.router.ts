import { Router } from 'express';
import { User } from '../controllers/user.controller';
import { authorizedUser } from '../middleware';

const router = Router();

router
  .get('/', authorizedUser, User.getUsers)

  .get('/cur-user', authorizedUser, User.getCurUser)
  .get('/:id', authorizedUser, User.getUsersOne)

  .patch('/:id', authorizedUser, User.updateUser)

  .delete('/:id', authorizedUser, User.deleteUser);

export default router;
