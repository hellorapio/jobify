import { IUser } from "./modules/user/model/user.interface";

export type EmailOptions = {
  to: string;
  from: string;
  text: string;
  subject: string;
  html: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Signup = {
  email: string;
  password: string;
  role: "job seeker" | "company";
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

export type JobsWithIn = {
  lat: number;
  lng: number;
  unit: "mi" | "km";
  distance: number;
} & QueryObject;

export type QueryObject = {
  sort?: string;
  fields?: string;
  limit?: number;
  page?: number;
  keyword?: string;
  $text?: { $search: string };
} & Record<string, any>;

export type JWTObj = {
  id: string;
  iat: number;
  exp: number;
};

export type ResetPass = {
  resetURL: string;
  email: string;
  name: string;
};

export type Verification = {
  verify: string;
  email: string;
  name: string;
};

export type Welcome = {
  email: string;
  name: string;
};

export type EmailJobData =
  | {
      type: "reset-password";
      data: ResetPass;
    }
  | { type: "welcome"; data: Welcome }
  | {
      type: "verification";
      data: Verification;
    };
