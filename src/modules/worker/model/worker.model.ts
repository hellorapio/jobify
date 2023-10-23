import { Schema, model, Types } from "mongoose";
import { IWorker } from "./worker.interface";
import addHooks from "./worker.hooks";

const workerSchema = new Schema<IWorker>(
  {
    name: String,
    photo: String,
    user: {
      type: Types.ObjectId,
      unique: true,
      ref: "User",
    },
    gender: String,
    birthDate: Date,
    livesIn: {
      type: {
        type: String,
        enum: ["point"],
        default: undefined,
      },
      coordinates: { type: [Number], default: undefined },
      address: String,
    },
    experience: { type: [String], default: undefined },
    education: { type: [String], default: undefined },
    experienceYears: Number,
    age: Number,
    resume: String,
    username: {
      type: String,
      unique: true,
    },
    active: Boolean,
  },
  { versionKey: false }
);

addHooks(workerSchema);

const Worker = model<IWorker>("Worker", workerSchema);

export default Worker;
