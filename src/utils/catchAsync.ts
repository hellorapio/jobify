import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types";

export default (
  fn: (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => Promise<any>
) => {
  return (req: CustomRequest, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};
