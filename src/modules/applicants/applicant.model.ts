import mongoose, { ObjectId } from "mongoose";

interface IApplicant {
  userId: ObjectId;
  companyId: ObjectId;
  status: "Pending" | "Interviewing" | "Rejected" | "Accepted";
  jobId: ObjectId;
  letter: string;
}

const applicantSchema = new mongoose.Schema<IApplicant>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Worker",
  },
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: "Job",
  },
  companyId: {
    type: mongoose.Types.ObjectId,
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

export default mongoose.model<IApplicant>("applicant", applicantSchema);
