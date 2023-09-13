import { Response } from "express";
import config from "../config/config";
import { TUser } from "../auth/user.model";
import { signToken } from "./jwt";

export default async (user: TUser, code: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(config.jwtExpCookie) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  if (config.env === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(code).json({
    status: "Success",
  });
};
