var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "9b62c71f-1af3-42a7-afd3-97da6768a00c",
    appPassword: "0MTXpGxEiX5vz6qSbEmLDCh"
});

// Listen for messages from users
server.post('/api/messages', connector.listen());
server.get('/', (req, res) => {
    res.send("hello restify")
});

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {

    const text = session.message.text;
    if (text.trim().toLowerCase().replace(" ", "").indexOf("димагей")) {
        session.send("lol +1");
    }
    else {
        session.send("You said: %s", text);
    }
});