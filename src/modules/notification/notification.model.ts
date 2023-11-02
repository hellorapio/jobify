import { Schema, Types, model } from "mongoose";
import INotification from "./notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Types.ObjectId, ref: "User" },
    read: Boolean,
    readAt: Date,
    content: String,
  },
  { versionKey: false, timestamps: true }
);

const Notification = model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
