import {ChatConnector} from "botbuilder";
import * as express from "express";

export function initServer(botConnector: ChatConnector) {
  const server = express();



  server.post("/api/messages", botConnector.listen());
  server.get("/", (req, res) => {
    res.send("hello restify");
  });

  const port = process.env.port || process.env.PORT || 8080;

  server.listen(port, function () {
    console.log(" listening on %s", port);
  });
}