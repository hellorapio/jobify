import { Document } from "mongoose";

interface IUserMethods extends Document {
  correctPassword(pass: string, realPass: string): Promise<boolean>;
  changedPassword(JWTTimeIssued: number): Promise<boolean>;
  logout(JWTTimeIssued: number): Promise<boolean>;
  generateToken(): Promise<string>;
}

interface CompanySchema {
  founded: Date;
  companyDescription: string;
  numberOfEmployees: number;
  jobs: number;
  address: string;
  ratingsAverage: number;
  ratingsCount: number;
  revenue: number;
  contactInformation: {
    website: string;
    phone: string;
    email: string;
    linkedinProfile: string;
    twitterProfile: string;
  };
  industry: string[];
  locations: {
    type: "point";
    coordinates: [number, number];
    address: string;
  }[];
}

interface WorkerSchema {
  gender: string;
  birthDate: Date;
  address: string;
  livesIn: {
    type: "point";
    coordinates: [number, number];
  };
  experience: string[];
  education: string[];
  experienceYears: number;
  age: number;
  resume: string;
}

interface IUserSchema extends Document, CompanySchema, WorkerSchema {
  name: string;
  photo: string;
  email: string;
  role: "worker" | "company" | "admin";
  password: string;
  passwordChangeDate: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  loggedOutAt: Date;
  joinDate: Date;
  active: boolean;
  username: string;
}

export type IUser = IUserSchema & IUserMethods;
