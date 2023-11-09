import { NextFunction, Request, Response } from "express";
import redis from "../core/redis";
import ManyRequests from "../errors/manyRequests";

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path === "/api/v1/auth/login") {
    res.set("X-RateLimit-Limit", "12");
    const requests = await redis.incr(req.ip + "login");

    if (requests === 1) {
      await redis.expire(req.ip + "login", 600);
      res.set("X-RateLimit-Remaining", "11");
    }

    if (requests > 12) {
      res.set("X-RateLimit-Remaining", "0");
      throw new ManyRequests("Too much login Requests from this IP");
    }

    res.set("X-RateLimit-Remaining", (12 - requests).toString());
  } else {
    res.set("X-RateLimit-Limit", "140");
    const requests = await redis.incr(req.ip!);

    if (requests === 1) {
      await redis.expire(req.ip!, 3600);
      res.set("X-RateLimit-Remaining", "139");
    }

    if (requests > 140) {
      res.set("X-RateLimit-Remaining", "0");
      throw new ManyRequests("You have exceeded Requests per hour");
    }
    
    res.set("X-RateLimit-Remaining", (140 - requests).toString());
  }

  next();
};

export default rateLimiter;
