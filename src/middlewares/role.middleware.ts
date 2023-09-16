import { NextFunction, Request, Response } from "express";

export const company = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.role = "company";
  next();
};

export const worker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.role = "worker";
  next();
};

export default {
  company,
  worker,
};
