import {UniversalBot, ChatConnector} from "botbuilder";

export function createBot(botConnector: ChatConnector): UniversalBot {

  const bot = new UniversalBot(botConnector, function (session) {
    try {
      const text = session.message.text;
      if (text.trim().toLowerCase().replace(" ", "").indexOf("димагей") !== -1) {
        session.send("lol +1");
      }
      else {
        session.send("You said: %s", text);
      }
    }
    catch (e) {
      session.send(e.message || e && e.toString());
    }
  });
  return bot;
}
