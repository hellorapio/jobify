import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import addHooks from "./user.hooks";

const userSchema = new Schema<IUser>(
  {
    name: String,
    photo: String,
    gender: String,
    birthDate: Date,
    experience: { type: [String], default: undefined },
    education: { type: [String], default: undefined },
    experienceYears: Number,
    age: Number,
    resume: String,
    address: String,
    livesIn: {
      type: { type: String, enum: ["Point"], default: undefined },
      coordinates: { type: [Number], default: undefined },
    },
    jobs: Number,
    founded: Date,
    ratingsAverage: Number,
    ratingsCount: Number,
    companyDescription: String,
    numberOfEmployees: Number,
    revenue: Number,
    contactInformation: {
      website: String,
      phone: String,
      email: String,
      linkedinProfile: String,
      twitterProfile: String,
    },
    industry: { type: [String], default: undefined },
    locations: {
      type: [
        {
          type: { type: String, enum: ["point"] },
          coordinates: [Number],
          address: String,
        },
      ],
      default: undefined,
    },
    email: { type: String, unique: true, select: false },
    role: { type: String },
    password: { type: String, select: false },
    passwordResetToken: { type: String, select: false },
    passwordChangeDate: { type: Date, select: false },
    passwordResetExpires: { type: Date, select: false },
    loginAttempts: { type: Number, select: false },
    loggedOutAt: { type: Date, select: false },
    joinDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true, select: false },
    verificationToken: { type: String, select: false },
    verificationTokenExpires: { type: Date, select: false },
    isVerified: { type: Boolean, default: false, select: false },
    isVerifiedAt: { type: Date, select: false },
    username: { type: String, unique: true },
  },
  { versionKey: false }
);

addHooks(userSchema);

const User = model<IUser>("User", userSchema);

export default User;
