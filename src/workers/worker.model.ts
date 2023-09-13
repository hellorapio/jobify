import mongoose, { InferSchemaType, mongo } from "mongoose";

const workerSchema = new mongoose.Schema({
  photo: String,
  userId: mongoose.Types.ObjectId,
  gender: {
    type: String,
    enum: ["Male", "Female", ""],
  },
  birthDate: Date,
  livesIn: {
    type: {
      type: String,
      default: "point",
      enum: ["point"],
    },
    coordinates: [Number],
    address: String,
  },
  experience: { type: [String], default: undefined },
  education: { type: [String], default: undefined },
  experienceYears: Number,
  age: Number,
  resume: String,
});

type Worker = InferSchemaType<typeof workerSchema>;

export default mongoose.model<Worker>("worker", workerSchema);
