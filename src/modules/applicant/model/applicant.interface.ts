import { ObjectId, Document } from "mongoose";

export interface IApplicant extends Document {
  workerId: ObjectId;
  companyId: ObjectId;
  status: "Pending" | "Interviewing" | "Rejected" | "Accepted";
  jobId: ObjectId;
  letter: string;
}
