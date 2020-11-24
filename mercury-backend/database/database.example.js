const mongoose = require("mongoose");

const user = "";
const password = "";
const cluster = "";
const databaseName = "";

const dbURL = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

database.on("connected", () => {
  console.log("[MongoDB] : Connected successfully!");
});

database.on("disconnected", () => {
  console.log("[MongoDB] : Database disconnected!");
});

database.on("error", () => {
  console.log("[MongoDB] : An error occured while connecting to database!");
});

module.exports = database;
