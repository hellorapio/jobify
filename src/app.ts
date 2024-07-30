import express from "express";
import "express-async-errors";
import connectDB from "./core/mongo";
import addMiddlewares from "./core/middlewares";
import addRoutes from "./core/routes";

async function init() {
  const app = express();

  await connectDB();
  await addMiddlewares(app);
  await addRoutes(app);

  return app;
}

export default init;
