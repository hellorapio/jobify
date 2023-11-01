import { v2 as cloudinary } from "cloudinary";
import config from "../config/config";
import { unlink } from "fs/promises";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadImg = async (img: string) => {
  const { url } = await cloudinary.uploader.upload(img, {
    folder: "users",
    overwrite: true,
    use_filename: true,
    unique_filename: false,
    transformation: [
      { width: 1000, crop: "scale" },
      { quality: "auto:best" },
      { fetch_format: "auto" },
    ],
  });

  await unlink(img);
  return url;
};

export default uploadImg;
