import { model, Schema, Types } from "mongoose";
import { IApplicant } from "./applicant.interface";
import addHooks from "./applicant.hooks";

const applicantSchema = new Schema<IApplicant>(
  {
    worker: { type: Types.ObjectId, ref: "Worker" },
    job: String,
    company: { type: Types.ObjectId, ref: "company" },
    status: { type: String, default: "Pending" },
    letter: String,
  },
  { versionKey: false, timestamps: true }
);

addHooks(applicantSchema);

applicantSchema.index({ worker: 1, job: 1 }, { unique: true });

const Applicant = model<IApplicant>("Applicant", applicantSchema);

export default Applicant;
