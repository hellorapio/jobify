import { NextFunction, Request, Response } from "express";
import { validateMIMEType } from "validate-image-type";
import BadRequest from "../errors/badRequest";
import { unlink } from "fs/promises";

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

export default imgValidator;