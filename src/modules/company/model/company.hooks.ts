import { Schema } from "mongoose";
import slugify from "slugify";
import { randomBytes } from "crypto";
import { ICompany } from "./company.interface";

const addHooks = (schema: Schema<ICompany>) => {
  schema.pre("save", async function (next) {
    if (!this.isNew) return next();
    this.username = slugify(this.name + randomBytes(3).toString("hex"), {
      lower: true,
      trim: true,
    });
    next();
  });
};

export default addHooks;
