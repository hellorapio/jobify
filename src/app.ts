import express from "express";
import "express-async-errors";
import connectDB from "./core/mongo";
import addMiddlewares from "./core/middlewares";
import addRoutes from "./core/routes";

const app = express();

connectDB();
addMiddlewares(app);
addRoutes(app);

export default app;
