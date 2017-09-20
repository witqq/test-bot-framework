import * as mongoose from "mongoose";

export function initDb() {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/botDb", {useMongoClient: true}).then(() =>
    console.log("connected to db"));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
}