import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { useTypeORM } from '../databases/postgres/typeorm';
import { UserEntity } from '../databases/postgres/entity/user.entity';
import argon from 'argon2';

passport.use(
  new LocalStrategy(async function (email, password, cb) {
    return useTypeORM(UserEntity)
      .find({ where: { email: email } })
      .then(async (users) => {
        for (const user of users) {
          if (await argon.verify(user.password, password)) {
            return cb(null, user, { message: 'Logged In Successfully' });
          }
        }
        return cb(null, false, { message: 'Incorrect email or password.' });
      })
      .catch((err) => cb(err));
  })
);
