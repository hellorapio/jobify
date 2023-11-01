import { v2 as cloudinary } from "cloudinary";
import config from "../config/config";
import { unlink } from "fs/promises";
import path from "path";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadImg = async (img: string) => {
  const { url } = await cloudinary.uploader.upload(
    path.join(__dirname, "../../public/images/", img),
    {
      folder: "users",
      overwrite: true,
      use_filename: true,
      unique_filename: false,
      transformation: [
        { width: 1000, crop: "scale" },
        { quality: "auto:best" },
        { fetch_format: "auto" },
      ],
    }
  );

  await unlink(path.join(__dirname, "../../public/images/", img));
  return url;
};

export default uploadImg;
