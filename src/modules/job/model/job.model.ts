import { Schema, model } from "mongoose";
import { IJob } from "./job.interface";
import addHooks from "./job.hooks";

const jobSchema = new Schema<IJob>(
  {
    title: String,
    description: String,
    location: {
      type: {
        type: {
          type: String,
          default: "point",
        },
        coordinates: [Number],
        address: String,
      },
    },
    company: String,
    salary: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    employmentType: {
      type: String,
      default: "full-time",
    },
    jobFunction: {
      type: String,
      default: "others",
    },
    experienceLevel: {
      type: String,
      default: "entry",
    },
    educationLevel: {
      type: String,
      default: "bachelor",
    },
    skills: [String],
    benefits: [String],
    contactEmail: String,
    applyUrl: String,
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.index({ company: 1 });

addHooks(jobSchema);

const Job = model<IJob>("Job", jobSchema);

export default Job;
