import { model, Schema, Types } from "mongoose";
import { IApplicant } from "./applicant.interface";
import addHooks from "./applicant.hooks";

const applicantSchema = new Schema<IApplicant>(
  {
    jobSeeker: { type: Types.ObjectId, ref: "User" },
    company: { type: Types.ObjectId, ref: "User" },
    job: { type: Types.ObjectId, ref: "Job" },
    status: { type: String, default: "Pending" },
    letter: String,
  },
  { versionKey: false, timestamps: true }
);

addHooks(applicantSchema);

applicantSchema.index({ jobSeeker: 1, job: 1 }, { unique: true });

const Applicant = model<IApplicant>("Applicant", applicantSchema);

export default Applicant;
