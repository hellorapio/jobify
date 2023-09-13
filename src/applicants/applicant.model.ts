import mongoose, { InferSchemaType, ObjectId } from "mongoose";

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
    ref: "User",
  },
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: "Job",
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "Pending",
  },
  letter: {
    type: String,
  },
});

type Applicant = InferSchemaType<typeof applicantSchema>;

export default mongoose.model<Applicant>("applicant", applicantSchema);
