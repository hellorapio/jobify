import multer from "multer";
import BadRequest from "../errors/badRequest";
import { mkdir } from "fs/promises";

const storage = multer.diskStorage({
  destination: async (_, __, cb) => {
    await mkdir("public/images", { recursive: true });
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = `user-${req.user.id}.${file.mimetype.split("/")[1]}`;
    cb(null, fileName);
  },
});

const filter = async (_, file, cb) => {
  if (!file.mimetype.startsWith("image"))
    cb(new BadRequest("This not an Image. Please Upload a Valid Img"));
  else cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: filter,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export default upload.single("photo");
