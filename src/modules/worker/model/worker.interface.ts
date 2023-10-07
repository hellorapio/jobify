import { Document, ObjectId } from "mongoose";

export interface IWorker extends Document {
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
