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
  plan: "professional" | "free" | "starter";
  planExpires: Date;
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

interface JobSeekerSchema {
  gender: string;
  birthDate: Date;
  address: string;
  livesIn: {
    type: "Point";
    coordinates: [number, number];
  };
  experience: string[];
  education: string[];
  experienceYears: number;
  resume: string;
}

interface IUserSchema extends Document, CompanySchema, JobSeekerSchema {
  name: string;
  photo: string;
  email: string;
  role: "job seeker" | "company" | "admin";
  password: string;
  passwordChangeDate: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  loggedOutAt: Date;
  joinDate: Date;
  isVerifiedAt: Date;
  verificationToken: string;
  verificationTokenExpires: Date;
  isVerified: boolean;
  active: boolean;
  username: string;
}

export type IUser = IUserSchema & IUserMethods;
