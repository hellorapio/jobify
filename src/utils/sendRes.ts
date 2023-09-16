import { Response } from "express";
import config from "../config/config";

export default async (
  res: Response,
  code: number,
  data?: any,
  token?: string
) => {
  if (token) {
    const cookieOptions = {
      expires: new Date(
        Date.now() + Number(config.jwtExpCookie) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false,
    };

    if (config.env === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
  }

  if (data) {
    res.status(code).json({
      status: "Success",
      data,
    });
  } else {
    res.status(code).json({
      status: "Success",
    });
  }
};
