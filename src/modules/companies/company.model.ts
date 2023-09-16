import mongoose, { Document, ObjectId } from "mongoose";

export interface ICompany extends Document {
  name: string;
  photo: string;
  companyId: ObjectId;
  founded: Date;
  companyDescription: string;
  numberOfEmployees: number;
  revenue: number;
  contactInformation: {
    website: string;
    phone: string;
    email: string;
    linkedinProfile: string;
    twitterProfile: string;
  };
  industry: string[];
  locations: {
    type: "point";
    coordinates: [number, number];
    address: string;
  }[];
}

const companySchema = new mongoose.Schema<ICompany>({
  name: String,
  photo: String,
  companyId: mongoose.Types.ObjectId,
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
});

export default mongoose.model<ICompany>("company", companySchema);
