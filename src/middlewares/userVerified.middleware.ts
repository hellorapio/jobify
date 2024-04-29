import { NextFunction, Response, Request } from "express";
import NotAuthorized from "../errors/notAuthorized";

export default function userVerified(
  req: Request,
  _: Response,
  next: NextFunction
) {
  // 5) Check if the user is Verified or not

  if (!req.user.isVerified)
    throw new NotAuthorized("Your Email is not Verified");

  next();
}
