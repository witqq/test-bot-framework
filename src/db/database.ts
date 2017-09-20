import * as mongoose from "mongoose";

export function initDb() {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/botDb");
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("connected to db");
    // we're connected!
  });
}