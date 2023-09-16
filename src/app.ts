import express from "express";
import "express-async-errors";
import connectMongo from "./core/db";
import addMiddlewares from "./core/middlewares";
import addRoutes from "./core/routes";

const app = express();

connectMongo();
addMiddlewares(app);
addRoutes(app);

export default app;
