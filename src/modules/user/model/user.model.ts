import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import addHooks from "./user.hooks";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordChangeDate: {
    type: Date,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  loggedOutAt: {
    type: Date,
    select: false,
  },
  joinDate: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

addHooks(userSchema);

const User = model<IUser>("User", userSchema);

export default User;
