import { Document, ObjectId } from "mongoose";

interface INotification extends Document {
  user: ObjectId;
  content: string,
  read: boolean
  readAt: Date,
}

export default INotification;
