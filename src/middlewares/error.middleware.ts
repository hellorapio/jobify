import { NextFunction, Request, Response } from "express";
import AppError from "../bases/base.error";
import config from "../config/config";
import BadRequest from "../errors/badRequest";

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something Went Wrong",
  });
};

const handleCastError = (err: AppError) => {
  const message = `Invalid Path on ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err: AppError) => {
  const dup = err.message.match(/"([^"]+)"/)![0];
  if (err.message.includes("email")) {
    const message = `This email already exists`;
    return new AppError(message, 409);
  } else {
    const message = `Duplicate Field: ${dup}`;
    return new AppError(message, 409);
  }
};

const handleMongooseValidation = (err: AppError) =>
  new AppError(err.message, 400);

const handleJWTErrors = () =>
  new AppError("Invalid Token Please Login Back", 401);

const handleJWTExpiredErrors = () =>
  new AppError("Your token has Been Expired please Login Back", 401);

const handleMulterError = () =>
  new BadRequest("The File is too Big, Maximum allowed size is 2mb");

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
    let error: AppError | any = {};
    error.message = err.message;
    error.statusCode = err.statusCode;
    error.status = err.status;

    if (err.name === "ValidationError")
      error = handleMongooseValidation(err);
    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDuplicateFields(err);
    if (err.name === "TokenExpiredError") error = handleJWTExpiredErrors();
    if (err.name === "JsonWebTokenError") error = handleJWTErrors();
    if (err.name === "MulterError") error = handleMulterError();
    sendErrorProd(error, res);
  }
};
