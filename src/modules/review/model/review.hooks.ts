import { Schema } from "mongoose";

const addHooks = (schema: Schema) => {
  schema.virtual("user", {
    ref: "Worker",
    localField: "userId",
    foreignField: "userId",
    justOne: true,
  });

  schema.virtual("company", {
    localField: "companyId",
    ref: "Company",
    foreignField: "userId",
    justOne: true,
  });

  schema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate({
      path: "user",
      select: "name username photo -_id -userId",
    });
    this.select("-companyId");
    next();
  });
};

export default addHooks;
