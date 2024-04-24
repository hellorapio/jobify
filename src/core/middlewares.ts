// @ts-ignore
import xss from "xss-clean";
import { Express } from "express";
import express from "express";
// import rateLimit from "express-rate-limit";
import sanitize from "express-mongo-sanitize";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "./../config/config";
import subscriptionController from "../modules/subscription/subscription.controller";
import rateLimiter from "../middlewares/rateLimiter.middleware";
import requestIp from "request-ip";

const addMiddlewares = async (app: Express) => {
  app.use(requestIp.mw());

  app.use(cors({ credentials: true, origin: config.host }));
  app.options("*", cors({ credentials: true, origin: config.host }));
  app.use(helmet());

  if (config.env === "development") app.use(morgan("dev"));

  // Rate Limiter Package

  // const limiter = rateLimit({
  //   max: 100,
  //   windowMs: 60 * 60 * 1000,
  //   message: "You have exceeded Requests per hour",
  // });
  // const loginLimiter = rateLimit({
  //   max: 10,
  //   windowMs: 5 * 60 * 1000,
  //   message: "You are Trying to login too much from this IP",
  // });
  // app.use("/api", limiter);
  // app.use("/api/v1/auth/login", loginLimiter);

  // Rate Limiter using Redis

  app.use(rateLimiter);

  app.use(
    "/stripe-hook",
    express.raw({ type: "application/json" }),
    subscriptionController.webhook
  );
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));
  app.use(cookieParser());

  app.use(sanitize());
  app.use(xss());
  app.use(hpp({ whitelist: "sort" }));

  app.use(compression());
};

export default addMiddlewares;
