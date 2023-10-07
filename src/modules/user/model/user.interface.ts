import { Document } from "mongoose";

interface IUserMethods extends Document {
  correctPassword(pass: string, realPass: string): Promise<boolean>;
  changedPassword(JWTTimeIssued: number): Promise<boolean>;
  logout(JWTTimeIssued: number): Promise<boolean>;
  generateToken(): Promise<string>;
}

interface IUserSchema extends Document {
  email: string;
  role: "worker" | "company" | "admin";
  password: string;
  passwordChangeDate: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  loggedOutAt: Date;
  joinDate: Date;
  active: boolean;
}

export type IUser = IUserSchema & IUserMethods;
