import { ObjectId, Document } from "mongoose";

export interface IApplicant extends Document {
  worker: ObjectId;
  company: ObjectId;
  status: "Pending" | "Interviewing" | "Rejected" | "Accepted";
  job: string;
  letter: string;
}
