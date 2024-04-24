import { CookieOptions, Response } from "express";
import config from "../config/config";

const sendResponse = async (
  res: Response,
  code: number,
  data?: any,
  token?: string
) => {
  if (token) {
    const cookieOptions: CookieOptions = {
      expires: new Date(
        Date.now() + config.jwt.cookie * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "none",
      domain: config.host,
    };

    res.cookie("jwt", token, cookieOptions);
  } else if (token === "") {
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
      secure: config.env === "production",
      sameSite: config.env !== "production",
    };

    res.cookie("jwt", "", cookieOptions);
  }

  res.status(code).json({
    status: "Success",
    data,
  });
};

export default sendResponse;
