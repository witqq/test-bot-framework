import {ChatConnector} from "botbuilder";
import * as express from "express";
import * as path from "path";

export function initServer(botConnector: ChatConnector) {
  const app = express();

  const root = path.resolve("static");
  console.log(root);
  app.use(express.static(root));

  app.post("/api/messages", botConnector.listen());

  const port = process.env.port || process.env.PORT || 8080;

  app.listen(port, function () {
    console.log(" listening on %s", port);
  });
}