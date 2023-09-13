// Modules

// @ts-ignore
import xss from "xss-clean";
import express from "express";
import rateLimit from "express-rate-limit";
import sanitize from "express-mongo-sanitize";

import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";

// Local Modules

import errorHandler from "./middlewares/error";
import AppError from "./utils/appError";
import jobRouter from "./jobs/job.router";
import applicantRouter from "./applicants/applicant.router";
import userRouter from "./users/user.router";
import authRouter from "./auth/auth.router";
import companyRouter from "./companies/company.router";
import reviewRouter from "./reviews/review.router";
import config from "./config/config";

const app = express();

// MiddleWares

app.use(helmet());

if (config.env === "development") app.use(morgan("dev"));

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 100,
  message: "You have exceeded Requests per hour",
});

app.use("/api", limiter);

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(sanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use("/api/v1/applicants", applicantRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find any routes on ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
