import { IUser } from "./modules/user/model/user.interface";

export type EmailOptions = {
  email: string;
  from: string;
  message: string;
  subject: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Signup = {
  email: string;
  password: string;
  role: "worker" | "company";
  name: string;
};

export type UpdatePassword = {
  password: string;
  currentPassword: string;
};

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export type QueryObject = {
  sort?: string;
  fields?: string;
  limit?: number;
  page?: number;
};

export type JWTObj = {
  id: string;
  iat: number;
  exp: number;
};
