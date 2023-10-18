import { Schema } from "mongoose";
import { IWorker } from "./worker.interface";
import slugify from "slugify";
import { randomBytes } from "crypto";

const addHooks = (schema: Schema<IWorker>) => {
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
