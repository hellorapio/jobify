import mongoose from "mongoose";
import config from "../config/config";

const connectMongo = async () => {
  const DB = config.DB.replace("<PASSWORD>", config.DBPassword);

  await mongoose.connect(DB, {}).then(() => {
    console.log("Connected to MongoDB");
  });
};

export default connectMongo;
