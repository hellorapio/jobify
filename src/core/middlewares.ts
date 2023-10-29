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

import config from "./../config/config";

const addMiddlewares = async (app: Express) => {
  app.enable("trust proxy");
  app.use(helmet());

  if (config.env === "development") app.use(morgan("dev"));

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "You have exceeded Requests per hour",
  });

  app.use("/api", limiter);

  app.use(
    express.json({
      limit: "10kb",
    })
  );

  app.use(cookieParser());

  app.use(sanitize());
  app.use(xss());
  app.use(hpp());

  app.use(compression());
};

export default addMiddlewares;
