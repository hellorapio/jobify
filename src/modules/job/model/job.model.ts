import { Schema, Types, model } from "mongoose";
import { IJob } from "./job.interface";
import addHooks from "./job.hooks";

const jobSchema = new Schema<IJob>(
  {
    title: String,
    description: String,
    address: String,
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    applicants: Number,
    companyName: String,
    company: { type: Types.ObjectId, ref: "User" },
    salary: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    remote: { type: Boolean, default: false },
    employmentType: { type: String, default: "full-time" },
    jobFunction: { type: String, default: "others" },
    experienceLevel: { type: String, default: "entry" },
    educationLevel: { type: String, default: "bachelor" },
    skills: [String],
    benefits: [String],
    contactEmail: String,
    applyUrl: String,
    views: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    slug: { type: String, unique: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    timestamps: true,
  }
);

jobSchema.index({ company: 1 });
jobSchema.index({ location: "2dsphere" });

addHooks(jobSchema);

const Job = model<IJob>("Job", jobSchema);

export default Job;
