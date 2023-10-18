import { Schema, model, Types } from "mongoose";
import { ICompany } from "./company.interface";

const companySchema = new Schema<ICompany>({
  name: String,
  photo: String,
  userId: Types.ObjectId,
  founded: Date,
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
});

const Company = model<ICompany>("company", companySchema);

export default Company;
