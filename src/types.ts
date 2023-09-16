import { Request } from "express";
import { IUserSchema } from "./modules/auth/user.model";

export type EmailOptions = {
  email?: string;
  message: string;
  subject: string;
};

export type QueryObject = {
  sort?: string;
  fields?: string;
  limit?: number;
  page?: number;
};

export type CustomRequest = Request & {
  user: IUserSchema;
};

export type JWTObj = {
  id: string;
  iat: number;
  exp: number;
};
