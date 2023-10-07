import { Document, ObjectId } from "mongoose";

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
