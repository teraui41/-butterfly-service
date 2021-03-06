const passport = require("passport");
const passportJWT = require("passport-jwt");
const isEmpty = require("lodash/isEmpty");
const LocalStrategy = require("passport-local").Strategy;
const { saltHashPassword } = require("../utils/authUtil");
const { userModel } = require('../models');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { AUTH_SECRET } = process.env;

const validateUserAndPassword = (user, password) => {
  if (isEmpty(user)) return { validated: false };

  const hashPassword = saltHashPassword(password);
  if (hashPassword !== user.password) return { validated: false };

  return { validated: true };
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "account",
      passwordField: "password"
    },
    async (account, password, done) => {
      try {
        const user = await getBackendUserByAccount(
          account,
          true
        );

        const { validated } = validateUserAndPassword(user, password);

        if (!validated) {
          const message = "使用者不存在或密码错误";
          const notfoundError = new Error(message);
          return done(notfoundError, null, { message });
        }

        return done(null, user);
      } catch (error) {
        const message = "使用者不存在或密码错误";
        const notLoginError = new Error(message);
        notLoginError.status = 401;
        return done(notLoginError, null, { message });
      }
    }
  )
);

passport.use('admin-rule',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH_SECRET
    },
    async function(jwtPayload, done) {
      try {
        const { account } = jwtPayload;
        const user = await userModel.findOne({ account });

        if (isEmpty(user)) {
          const notAuthError = new Error("使用者不存在，請重新登入。");
          notAuthError.status = 401;
          return done(notAuthError);
        }

        done(null, user, { message: "登入成功" });
      } catch (error) {
        const notAuthError = new Error("帳號驗證錯誤，請聯繫管理人員。");
        notAuthError.status = 401;
        return done(notAuthError, false);
      }
    }
  )
);


passport.use('user-rule',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH_SECRET
    },
    async function(jwtPayload, done) {
      try {
        const { bedNo, language } = jwtPayload;

        if (isEmpty(bedNo) || isEmpty(language)) {
          const notAuthError = new Error("請重新進入遊戲。");
          notAuthError.status = 401;
          return done(notAuthError);
        }

        done(null, { bedNo, language }, { message: "登入成功" });
      } catch (error) {
        const notAuthError = new Error("請重新進入遊戲。");
        notAuthError.status = 401;
        return done(notAuthError, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports.jwtAuthorizationMiddleware = passport.authenticate("admin-rule", {
  session: true,
});

module.exports.jwtUserAuthorizationMiddleware = passport.authenticate("user-rule", {
  session: true,
});
