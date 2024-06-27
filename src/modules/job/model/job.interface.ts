import { Document, ObjectId } from "mongoose";

type Categories =
  | "engineering"
  | "sales"
  | "marketing"
  | "tech"
  | "software"
  | "product"
  | "analytics"
  | "design"
  | "customer service"
  | "finance"
  | "human resources"
  | "healthcare"
  | "management"
  | "others";

export interface IJob extends Document {
  title: string;
  description: string;
  salary: number;
  currency: "GBP" | "EUR" | "YEN" | "USD" | "CHF" | "CAD" | "AUD" | "INR";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  address: string;
  company: ObjectId;
  tags: string[];
  applicants: number;
  remote: boolean;
  categories: Categories[];
  minExperience: number;
  maxExperience: number;
  experienceLevel:
    | "mid-level"
    | "entry"
    | "junior"
    | "senior"
    | "manager"
    | "staff"
    | "intern"
    | "freelancer";
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
