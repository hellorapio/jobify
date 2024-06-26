import { ObjectId, Document } from "mongoose";

export interface IApplicant extends Document {
  jobSeeker: ObjectId;
  company: ObjectId;
  status: "Pending" | "Interviewing" | "Rejected" | "Accepted";
  job: ObjectId;
  letter: string;
}
