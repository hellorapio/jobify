import mongoose, { Document, ObjectId } from "mongoose";

interface IWorker extends Document {
  name: string;
  photo: string;
  userId: ObjectId;
  gender: string;
  birthDate: Date;
  livesIn: {
    type: "point";
    coordinates: [number, number];
    address: string;
  };
  experience: string[];
  education: string[];
  experienceYears: number;
  age: number;
  resume: string;
}

const workerSchema = new mongoose.Schema<IWorker>({
  name: String,
  photo: String,
  userId: mongoose.Types.ObjectId,
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
  experience: { type: [String]},
  education: { type: [String]},
  experienceYears: Number,
  age: Number,
  resume: String,
});

export default mongoose.model<IWorker>("worker", workerSchema);
