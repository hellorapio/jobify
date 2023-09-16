import express from "express";
import connectMongo from "./core/DB";
import addMiddlewares from "./core/middlewares";
import addRoutes from "./core/routes";

const app = express();

connectMongo();
addMiddlewares(app);
addRoutes(app);

export default app;
