import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface UserMethods extends Document {
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
  lastLogout: Date;
  joinDate: Date;
  active: boolean;
}

const userSchema = new mongoose.Schema<IUserSchema>({
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
  lastLogout: {
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  //@ts-ignore
  this.passwordChangeDate = Date.now() - 4000;
  next();
});

userSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  pass: string,
  realPass: string
) {
  return await bcrypt.compare(pass, realPass);
};

userSchema.methods.changedPassword = async function (
  JWTTimeIssued: number
) {
  if (this.passwordChangeDate) {
    const timestamp = parseInt(
      String(this.passwordChangeDate.getTime() / 1000),
      10
    );
    return JWTTimeIssued < timestamp;
  }
  return false;
};

userSchema.methods.generateToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

userSchema.methods.logout = async function (JWTTimeIssued: number) {
  if (this.lastLogout) {
    return (
      JWTTimeIssued <
      parseInt(String(this.lastLogout.getTime() / 1000), 10)
    );
  }
  return false;
};

export default mongoose.model<IUserSchema & UserMethods>(
  "User",
  userSchema
);
