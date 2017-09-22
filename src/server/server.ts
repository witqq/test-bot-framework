import {ChatConnector} from "botbuilder";
import * as express from "express";
import * as path from "path";
import {initApiRouter} from "./routes/api";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import {configPasport} from "../config/passport";
import cookieParser = require("cookie-parser");
import session = require("express-session");

export function initServer(botConnector: ChatConnector) {
  const app = express();

  configPasport(passport);

  const root = path.resolve("static");
  app.use(express.static(root));

  app.use(bodyParser());
  app.use(cookieParser());
  app.use(session({secret: "testbotframeworkwitsecret"}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.post("/botframework/messages", botConnector.listen());

  initApiRouter(app);

  const port = process.env.port || process.env.PORT || 8080;

  app.listen(port, function () {
    console.log(" listening on %s", port);
  });
}