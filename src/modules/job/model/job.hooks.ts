import { IJob } from "./job.interface";
import { Schema } from "mongoose";
import slugify from "slugify";
import { randomBytes } from "crypto";

const addHooks = (schema: Schema<IJob>) => {
  schema.virtual("monthlyPay").get(function () {
    return this.salary / 12;
  });

  schema.pre("save", function (next) {
    if (!this.isNew) return next();
    this.slug = slugify(this.title + randomBytes(3).toString("hex"), {
      lower: true,
      trim: true,
    });
    next();
  });
};

export default addHooks;
