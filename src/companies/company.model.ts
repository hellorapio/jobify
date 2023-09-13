import mongoose, { Document, InferSchemaType, ObjectId } from "mongoose";

interface ICompany extends Document {
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

type Company = InferSchemaType<typeof companySchema>;

export default mongoose.model<Company>("company", companySchema);
