import { IUserSchema } from "./modules/auth/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserSchema;
    }
  }
}
