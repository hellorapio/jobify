require("dotenv").config({ path: `${__dirname}/config/.env` });
import mongoose from "mongoose";
import config from "./config/config";
import app from "./app";

process.on("uncaughtException", (err) => {
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

const DB = config.DB.replace("<PASSWORD>", config.DBPassword);

mongoose.connect(DB, {}).then(() => {
  console.log("Connected to MongoDB");
});

const server = app.listen(config.port, () => {
  console.log(`I'm listening on ${config.port}...`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
