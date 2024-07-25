import { NextFunction, Response, Request } from "express";
import NotAuthorized from "../errors/notAuthorized";

export default function userVerified(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.user.isVerified)
    throw new NotAuthorized("Your Email is not Verified");

  next();
}
