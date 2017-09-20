import {initDb} from "./db/database";
import {initServer} from "./server/server";
import {createMainConnector} from "./bot/bot-connector";
import {createBot} from "./bot/bot";

export function initApp() {
  initDb();
  const botConnector = createMainConnector();
  initServer(botConnector);
  createBot(botConnector);
}