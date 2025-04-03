// import passport from "passport";
// import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
// import { useTypeORM } from "../databases/postgres/typeorm";
// import { UserEntity } from "../databases/postgres/entity/user.entity";
// import { Request } from "express";
// import { verifyToken } from "../utils/authUtils";
// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: (req: Request) => {
//         // console.log(req.cookies);
//         // console.log(verifyToken(req.cookies.accessToken.toString()))
//         return req.cookies.accessToken.toString();
//       },
      
//       ignoreExpiration: false,
//       secretOrKey: process.env.PUBLIC_KEY || 'secret',
//       algorithms: ["RS256"],
//     },
//     async function (jwtPayload, cb) {
//       console.log(jwtPayload);
      
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       return useTypeORM(UserEntity)
//         .findOne({ where: { id: jwtPayload.userId } })
//         .then((user) => {
//           return cb(null, user);
//         })
//         .catch((err) => {
//           console.error(err);
          
//           return cb(err);
//         });
//     }
//   )
// );

// export const jwtMiddleware = passport.authenticate("jwt", { session: false });
