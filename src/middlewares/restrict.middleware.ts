import { NextFunction, Response, Request } from "express";
import Forbidden from "../errors/forbidden";

const restrictTo = (...roles: string[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (req.user.role === "admin") return next();
    if (!roles.includes(req.user.role)) throw new Forbidden();
    next();
  };
};

export default restrictTo;
