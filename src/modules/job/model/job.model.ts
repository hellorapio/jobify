import slugify from "slugify";
import { Schema, model, Types } from "mongoose";
import { IJob } from "./job.interface";

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
    companyId: {
      type: Types.ObjectId,
      ref: "User",
    },
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
      default: "mid",
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

jobSchema.virtual("monthlyPay").get(function () {
  return this.salary / 12;
});

jobSchema.pre("save", function (next) {
  this.slug = slugify(this.title + "-" + this.companyId, {
    lower: true,
  });
  next();
});

const Job = model<IJob>("Job", jobSchema);

export default Job;
