import jwt from "jsonwebtoken";
import config from "../config/config";

export const signToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpLimit,
  });
};
