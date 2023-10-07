import { Schema, model, Types } from "mongoose";
import { IWorker } from "./worker.interface";

const workerSchema = new Schema<IWorker>({
  name: String,
  photo: String,
  userId: Types.ObjectId,
  gender: {
    type: String,
  },
  birthDate: Date,
  livesIn: {
    type: {
      type: String,
      default: "point",
    },
    coordinates: [Number],
    address: String,
  },
  experience: { type: [String] },
  education: { type: [String] },
  experienceYears: Number,
  age: Number,
  resume: String,
});

const Worker = model<IWorker>("worker", workerSchema);

export default Worker;
