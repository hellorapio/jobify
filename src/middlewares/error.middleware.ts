import { NextFunction, Request, Response } from "express";
import AppError from "../errors/baseError";
import config from "../config/config";

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something Went Wrong",
    });
  }
};

const handleCastError = (err: AppError) => {
  const message = `Invalid Path on ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err: AppError) => {
  const dup = err.message.match(/"([^"]+)"/)![0];
  const message = `Duplicate Field: ${dup}`;
  return new AppError(message, 400);
};

const handleMongooseValidation = (err: AppError) =>
  new AppError(err.message, 400);

const handleJWTErrors = () =>
  new AppError("Invalid Token Please Login Back", 401);

const handleJWTExpiredErrors = () =>
  new AppError("Your token has Been Expired please Login Back", 401);

export default (
  err: AppError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "err";

  if (config.env === "development") sendErrorDev(err, res);
  else {
    let error = structuredClone(err);

    if (err.name === "ValidationError")
      error = handleMongooseValidation(err);
    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDuplicateFields(err);
    if (err.name === "TokenExpiredError") error = handleJWTExpiredErrors();
    if (err.name === "JsonWebTokenError") error = handleJWTErrors();
    sendErrorProd(error, res);
  }
};
