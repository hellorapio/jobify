import { Schema, model, Types } from "mongoose";
import { ICompany } from "./company.interface";
import addHooks from "./company.hooks";

const companySchema = new Schema<ICompany>(
  {
    name: String,
    photo: String,
    user: { type: Types.ObjectId, unique: true },
    founded: Date,
    ratingsAverage: Number,
    ratingsCount: Number,
    companyDescription: String,
    numberOfEmployees: Number,
    revenue: Number,
    contactInformation: {
      website: String,
      phone: String,
      email: String,
      linkedinProfile: String,
      twitterProfile: String,
    },
    industry: {
      type: [String],
    },
    locations: {
      type: [
        {
          type: {
            type: String,
            enum: ["point"],
          },
          coordinates: [Number],
          address: String,
        },
      ],
    },
    active: Boolean,
    username: { type: String, unique: true },
  },
  { versionKey: false }
);

addHooks(companySchema);

const Company = model<ICompany>("Company", companySchema);

export default Company;
