import { Request, Response, Router } from 'express';
import { addSuccessWrapper } from '../../utils/catchAsync';
import { UserService } from '../../services/user.services';
import { generateToken } from '../../utils/authUtils';
import passport from 'passport';
import IUser from '../../databases/postgres/model/user.model';
import { bad_req, success } from '../../utils/errorcodes';

const router = Router();

router
  .post('/register', async (req: Request, res: Response) => {
    const { userId, role } = req.user;
    const accessToken = generateToken({ userId, role }, 30 * 24 * 60 * 60);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    });
    addSuccessWrapper(res, UserService.createUser(req.body));
  })
  .post('/login', async (req: Request, res: Response) => {
    passport.authenticate(
      'local',
      { session: false },
      (err: any, user: Express.User | IUser) => {
        if (err || !user) {
          bad_req(res, {
            message: 'Auth failed',
            user,
          });
          return;
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.json(err);
            return;
          }
          const { id, role } = user as IUser;
          // generate a signed son web token with the contents of user object and return it in the response
          const accessToken = generateToken(
            { userId: id, role },
            30 * 24 * 60 * 60
          );
          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
          });
          success(res, user);
        });
      }
    )(req, res);
  });

export default router;
