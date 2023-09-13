import slugify from "slugify";
import mongoose, { Document, ObjectId, InferSchemaType } from "mongoose";

interface IJob extends Document {
  title: string;
  description: string;
  salary: number;
  currency: "GBP" | "EUR" | "YEN" | "USD" | "CHF";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  location: {
    type: "point";
    coordinates: [number, number];
    address: string;
  };
  datePosted: Date;
  companyId: ObjectId;
  remote: boolean;
  jobFunction:
    | "engineering"
    | "sales"
    | "marketing"
    | "product"
    | "design"
    | "customer service"
    | "finance"
    | "human resources"
    | "healthcare"
    | "others";
  experienceLevel: "mid" | "entry" | "senior";
  educationLevel:
    | "high school"
    | "associate"
    | "bachelor"
    | "master"
    | "doctorate";
  skills: string[];
  benefits: string[];
  contactEmail: string;
  applyUrl: string;
  views: number;
  isActive: boolean;
  slug: string;
}

const jobSchema = new mongoose.Schema<IJob>(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
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
      type: mongoose.Schema.Types.ObjectId,
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
    skills: {
      type: [String],
      required: [true, "The Job should have its Skills"],
    },
    benefits: {
      type: [String],
      required: [true, "The Job should have its Benefits"],
    },
    contactEmail: {
      type: String,
      required: [true, "The Job should have its Contact-Email"],
    },
    applyUrl: {
      type: String,
      required: [true, "The Job should have its url Applying"],
    },
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

type Job = InferSchemaType<typeof jobSchema>;

export default mongoose.model<Job>("Job", jobSchema);
