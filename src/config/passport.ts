import {PassportStatic} from "passport";
import {User} from "../db/models/user";
import {Strategy, IVerifyOptions} from "passport-local";
import {Request} from "express";

export function configPasport(passport: PassportStatic) {

  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use("local-signup", new Strategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req: Request, email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {

      // asynchronous
      // User.findOne wont fire unless data is sent back

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({"local.email": email}, (err, user) => {
          // if there are any errors, return the error
          if (err) {
            return done(err);
          }

          // check to see if theres already a user with that email
          if (user) {
            return done(new Error("user exists"));
            // return done(null, false, {message: "That email is already taken."});
          } else {

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }

        });



    }));

};
