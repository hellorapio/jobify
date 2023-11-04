import { NextFunction, Request, Response } from "express";
import multer from "multer";
import BadRequest from "../errors/badRequest";
import { mkdir, unlink } from "fs/promises";
import { validateMIMEType } from "validate-image-type";
// import sharp from "sharp";

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

const imgValidator = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.file) {
    const result = await validateMIMEType(req.file.path, {
      allowMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
    });

    if (!result.ok) {
      await unlink(req.file.path);
      throw new BadRequest("This is not a Supported Img");
    }
  }

  next();
};

// const imgResize = async (
//   req: Request,
//   _: Response,
//   next: NextFunction
// ) => {
//   if (req.file) {
//     const filename = req.file.filename.replace(/\.[^/.]+$/, "");
//     await sharp(req.file.path)
//       .resize(600)
//       .toFormat("jpeg")
//       .jpeg({ quality: 90 })
//       .toFile(req.file.destination + "/" + filename + ".jpeg");
//   }

//   next();
// };

export default [upload.single("photo"), imgValidator];
