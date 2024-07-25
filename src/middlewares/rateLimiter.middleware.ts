import { NextFunction, Request, Response } from "express";
import redis from "../core/redis";
import ManyRequests from "../errors/manyRequests";

type RateLimiterOptions = {
  hits: number;
  mins: number;
  msg: string;
  suffix?: string;
};

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (req.path) {
    case "/api/v1/auth/login":
      return limiter({
        hits: 15,
        mins: 15,
        msg: "You've exceeded the login attempt limit",
        suffix: "login",
      })(req, res, next);
    case "/health":
      next();
      break;
    default:
      return limiter({
        hits: 140,
        mins: 60,
        msg: "You've Exceeded Allowed Requests Limit",
      })(req, res, next);
  }
};

const limiter = ({ hits, mins, msg, suffix = "" }: RateLimiterOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.set("X-RateLimit-Limit", hits.toString());
    const requests = await redis.incr(req.clientIp + suffix);

    if (requests === 1) {
      await redis.expire(req.clientIp + suffix, mins * 60);
      res.set("X-RateLimit-Remaining", (hits - 1).toString());
    }

    if (requests > hits) {
      res.set("X-RateLimit-Remaining", "0");
      throw new ManyRequests(msg);
    }

    res.set("X-RateLimit-Remaining", (hits - requests).toString());

    next();
  };
};

export default rateLimiter;
