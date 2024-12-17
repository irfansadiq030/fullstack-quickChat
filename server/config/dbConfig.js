const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB Connected Successful");
});

db.on("err", () => {
  console.log("DB Connection Failed..");
});

module.exports = db;
