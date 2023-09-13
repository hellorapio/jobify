import jwt from "jsonwebtoken";
import { promisify } from "util";
import { NextFunction, Response } from "express";
import User from "../auth/user.model";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { CustomRequest } from "../types";
import config from "../config/config";

export const restrictTo = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user.role === "admin") next();
    if (!roles.includes(req.user.role))
      next(
        new AppError(
          "You don't have admin Permissions to Make any changes in this Route",
          403
        )
      );

    next();
  };
};

export const authProtection = catchAsync(async (req, res, next) => {
  // Getting the Token

  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next(new AppError("You are not Logged in, Please Log in", 401));

  // Verifying the Token if exists

  const verify: any = await promisify(jwt.verify)(
    token,
    // @ts-ignore
    config.jwtSecret,
    { algorithms: ["HS256"] }
  );

  // Does the user Exists ?

  const user = await User.findById(verify.id).select(
    "+passwordChangeDate +lastLogout"
  );

  if (!user)
    return next(new AppError("User Doesn't Exist please Signup", 401));

  // Did user reset his pass ?
  if (await user.changedPassword(verify.iat))
    return next(
      new AppError("Please Login, The Password has been Changed", 401)
    );

  if (await user.logout(verify.iat))
    return next(
      new AppError("You have Logged out, Please login Back", 401)
    );

  // Access GRANTED HAPPY HACKING <3
  req.user = user;
  next();
});

export const passwordProtection = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError("Passwords can't be Changed at this Route", 400)
    );

  next();
});
