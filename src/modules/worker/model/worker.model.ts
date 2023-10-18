import { Schema, model, Types } from "mongoose";
import { IWorker } from "./worker.interface";
import addHooks from "./worker.hooks";

const workerSchema = new Schema<IWorker>({
  name: String,
  photo: String,
  userId: {
    type: Types.ObjectId,
    unique: true,
  },
  gender: String,
  birthDate: Date,
  livesIn: {
    type: {
      type: String,
      default: "point",
    },
    coordinates: [Number],
    address: String,
  },
  experience: [String],
  education: [String],
  experienceYears: Number,
  age: Number,
  resume: String,
  username: {
    type: String,
    unique: true,
  },
  active: Boolean,
});

addHooks(workerSchema);

const Worker = model<IWorker>("worker", workerSchema);

export default Worker;
