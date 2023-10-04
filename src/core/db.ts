import mongoose from "mongoose";
import config from "../config/config";

const connectDB = async () => {
  await mongoose.connect(config.database, {}).then(() => {
    console.log("MongoDB is up");
  });
};

export default connectDB;
