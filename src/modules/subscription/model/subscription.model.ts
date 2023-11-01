import { Schema, Types, model } from "mongoose";
import ISub from "./subscription.interface";

const subSchema = new Schema<ISub>(
  {
    company: { type: Types.ObjectId, ref: "User" },
    paid: Boolean,
    plan: String,
    endsAt: Date,
    total: Number,
    currency: String,
  },
  { versionKey: false, timestamps: true }
);

const Sub = model<ISub>("Sub", subSchema);

export default Sub;
