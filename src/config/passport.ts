import {PassportStatic} from "passport";
import {User} from "../db/models/user";
import {Strategy, IVerifyOptions} from "passport-local";
import {AuthError} from "../server/utils/auth-error";

export function configPasport(passport: PassportStatic) {

  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use("local-signup", new Strategy({
      usernameField: "email",
      passwordField: "password"
    },
    (email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {

      if (!email) {
        return done(new AuthError("empty mail"));
      }
      if (!password) {
        return done(new AuthError("empty password"));
      }
      User.findOne({"local.email": email}, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(new AuthError("That email is already taken."));
        } else {
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }

      });
    }));

  passport.use("local-login", new Strategy({
      usernameField: "email",
      passwordField: "password"
    },
    (email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {

      User.findOne({"local.email": email}, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(new AuthError("No user found."));
        }

        if (!user.validPassword(password)) {
          return done(new AuthError("Oops! Wrong password."));
        }

        return done(null, user);
      });

    }));
};
