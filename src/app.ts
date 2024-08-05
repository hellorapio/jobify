import express from "express";
import "express-async-errors";
import connectDB from "./core/mongo";
import addMiddlewares from "./core/middlewares";
import addRoutes from "./core/routes";

async function init() {
  const app = express();

  connectDB();
  addMiddlewares(app);
  addRoutes(app);

  return app;
}

export default init;
