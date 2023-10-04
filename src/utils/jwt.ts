import jwt from "jsonwebtoken";
import config from "../config/config";

const sign = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expires,
      },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

const verify = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      config.jwt.secret,
      { algorithms: ["HS256"] },
      (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      }
    );
  });
};

export default { verify, sign };
