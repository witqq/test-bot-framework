import {Router, Application, Response, Request, NextFunction} from "express";
import * as passport from "passport";
import {User} from "../../db/models/user";
import {IVerifyOptions} from "passport-local";
import {ApiError} from "../utils/api-error";
import {AuthError} from "../utils/auth-error";

const API_PATH = "/api";
const apiRouter = Router();

const authCb = (strategy: string) => (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(strategy, function (err: Error, user: User, info: IVerifyOptions) {
    if (err) {
      return next(err);
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      res.status(401);
      return res.json({success: false, message: info.message});
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.json({success: true, message: "authentication succeeded", userName: user.local.email});
    });
  })(req, res, next);
};

apiRouter.post("/register", passport.authenticate("local-signup"), (req: Request, res) => {
  res.json({success: true, message: "register succeeded", userName: req.user.local.email})
});

apiRouter.post("/login", passport.authenticate("local-login"), (req: Request, res) => {
  res.json({success: true, message: "login succeeded", userName: req.user.local.email})
});

apiRouter.use((req, res: Response, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  next(new AuthError("You are nor logged in"));
});

apiRouter.get("/logout",
  (req, res) => {
    req.logout();
    res.sendStatus(200)
  });

apiRouter.get("/test", function (req, res, next) {
  res.json({hello: "api"});
});

apiRouter.use(function (err: Error, req: Request, res: Response, next) {
  if (err instanceof ApiError) {
    if (err.status != null) {
      res.status(err.status);
    }
    return res.json({success: false, message: err.message});
  }
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export function initApiRouter(app: Application) {
  return app.use(API_PATH, apiRouter);
}


