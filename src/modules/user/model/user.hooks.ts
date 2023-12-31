import { IUser } from "./user.interface";
import { Schema, UpdateQuery } from "mongoose";
import bcrypt from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import slugify from "slugify";
import addressDetails from "../../../utils/addressDetails";

const addHooks = async (schema: Schema<IUser>) => {
  schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 8);

    next();
  });

  schema.pre("save", async function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    //@ts-ignore
    this.passwordChangeDate = Date.now() - 4000;
    next();
  });

  schema.pre(/^find/, function (next) {
    //@ts-ignore
    this.find({ active: { $ne: false } });
    next();
  });

  schema.methods.correctPassword = async function (
    pass: string,
    realPass: string
  ) {
    return await bcrypt.compare(pass, realPass);
  };

  schema.methods.changedPassword = async function (iat: number) {
    if (this.passwordChangeDate)
      return iat < Math.trunc(this.passwordChangeDate.getTime() / 1000);
  };

  schema.methods.logout = async function (iat: number) {
    if (this.loggedOutAt)
      return iat < Math.trunc(this.loggedOutAt.getTime() / 1000);
  };

  schema.methods.generateToken = async function () {
    const resetToken = randomBytes(32).toString("hex");

    this.passwordResetToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
    return resetToken;
  };

  schema.pre<UpdateQuery<IUser>>(
    "findOneAndUpdate",
    async function (next) {
      if (!this.getUpdate()) return next();
      if (this.getUpdate().address) {
        const { lon, lat } = await addressDetails(
          this.getUpdate().address
        );
        this.getUpdate().livesIn = {
          coordinates: [lon, lat],
          type: "Point",
        };
      }
      next();
    }
  );

  schema.pre("save", async function (next) {
    if (!this.isNew) return next();
    if (this.role === "company") {
      this.plan = "free";
      this.ratingsAverage = 0;
      this.ratingsCount = 0;
      this.jobs = 0;
    }
    if (this.address) {
      const { lon, lat } = await addressDetails(this.address);
      this.livesIn = {
        coordinates: [lon, lat],
        type: "Point",
      };
    }
    this.username = slugify(this.name + randomBytes(3).toString("hex"), {
      lower: true,
      trim: true,
    });
    next();
  });
};

export default addHooks;
