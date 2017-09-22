import {Router, Application, Response} from "express";
import * as passport from "passport";

const API_PATH = "/api";
const apiRouter = Router();

apiRouter.post("/register", passport.authenticate("local-signup"));

apiRouter.use((req, res: Response, next) => {

  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
});

apiRouter.get("/test", function (req, res, next) {
  res.json({hello: "api"});
});

export function initApiRouter(app: Application) {
  return app.use(API_PATH, apiRouter);
}


