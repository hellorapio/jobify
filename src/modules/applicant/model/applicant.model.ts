import { model, Schema, Types } from "mongoose";
import { IApplicant } from "./applicant.interface";

const applicantSchema = new Schema<IApplicant>({
  workerId: {
    type: Types.ObjectId,
    ref: "Worker",
  },
  jobId: {
    type: Types.ObjectId,
    ref: "Job",
  },
  companyId: {
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

const Applicant = model<IApplicant>("applicant", applicantSchema);

export default Applicant;
