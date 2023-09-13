import { Request } from "express";
import { TUser } from "./auth/user.model";

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

export interface CustomRequest extends Request {
  user: TUser;
}

export type JWTObj = {
  id: string;
  iat: number;
  exp: number;
};
