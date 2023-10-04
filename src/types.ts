import { IUser } from "./modules/users/user.model";

export type EmailOptions = {
  email?: string;
  message: string;
  subject: string;
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
