// @ts-ignore
import xss from "xss-clean";
import { Express } from "express";
import express from "express";
import rateLimit from "express-rate-limit";
import sanitize from "express-mongo-sanitize";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "./../config/config";

const addMiddlewares = async (app: Express) => {
  app.set("trust proxy", 1);

  app.use(cors());
  app.options("*", cors());
  app.use(helmet());

  if (config.env === "development") app.use(morgan("dev"));

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "You have exceeded Requests per hour",
  });

  app.use("/api", limiter);

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));
  app.use(cookieParser());

  app.use(sanitize());
  app.use(xss());
  app.use(hpp({ whitelist: "sort" }));

  app.use(compression());
};

export default addMiddlewares;
