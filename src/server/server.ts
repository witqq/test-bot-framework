import {createServer} from "restify";
import {ChatConnector} from "botbuilder";

export function initServer(botConnector: ChatConnector) {
  const server = createServer();
  server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log("%s listening to %s", server.name, server.url);
  });

  server.post("/api/messages", botConnector.listen());
  server.get("/", (req, res) => {
    res.send("hello restify");
  });
}