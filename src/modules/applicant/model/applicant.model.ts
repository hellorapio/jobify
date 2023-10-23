import { model, Schema, Types } from "mongoose";
import { IApplicant } from "./applicant.interface";

const applicantSchema = new Schema<IApplicant>({
  worker: {
    type: Types.ObjectId,
    ref: "Worker",
  },
  job: {
    type: Types.ObjectId,
    ref: "Job",
  },
  company: {
    type: Types.ObjectId,
    ref: "company",
  },
  status: {
    type: String,
    default: "Pending",
  },
  letter: {
    type: String,
  },
});

applicantSchema.index({ workerId: 1, jobId: 1 }, { unique: true });

const Applicant = model<IApplicant>("Applicant", applicantSchema);

export default Applicant;
