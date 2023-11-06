import { Document, ObjectId } from "mongoose";

interface ISub extends Document {
  company: ObjectId;
  paid: boolean;
  plan: "professional" | "starter";
  endsAt: Date;
  total: number;
  currency: string;
}

export default ISub;
