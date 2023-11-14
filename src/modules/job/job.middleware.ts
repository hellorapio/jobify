import { NextFunction, Request, Response } from "express";
import ipDetails from "../../utils/ipDetails";
import addressDetails from "../../utils/addressDetails";
import BadRequest from "../../errors/badRequest";
import NotAuthorized from "../../errors/notAuthorized";

class JobMiddleware {
  static async JobsWithIn(req: Request, _: Response, next: NextFunction) {
    if (!req.query.lat || !req.query.lng) {
      if (req.query.address) {
        const details = await addressDetails(req.query.address as string);
        const { lat, lon } = details;
        req.query.lng = lon;
        req.query.lat = lat;
      } else {
        const { latitude, longitude } = await ipDetails(`${req.ip}`);
        req.query.lng = longitude;
        req.query.lat = latitude;
      }
    }

    next();
  }

  static async withInUser(req: Request, _: Response, next: NextFunction) {
    if (req.user.address) {
      req.query.lng = req.user.livesIn.coordinates[0].toString();
      req.query.lat = req.user.livesIn.coordinates[1].toString();
    } else throw new BadRequest("The use didn't add His Address");

    next();
  }

  static async wantedJobs(req: Request, _: Response, next: NextFunction) {
    req.query.limit = "5";
    req.query.fields = "title,salary.value";
    req.query.sort = "-salary";
    next();
  }

  static async isPaid(req: Request, _: Response, next: NextFunction) {
    const { jobs, plan, planExpires } = req.user;

    if (jobs) {
      if (planExpires && planExpires.getTime() > Date.now()) {
        if (plan === "professional" && jobs < 100) return next();
        if (plan === "starter" && jobs < 25) return next();
      }
      if (jobs < 10) return next();

      throw new NotAuthorized("You have Exceeded Your Jobs Qouta");
    }
    next();
  }
}

export default JobMiddleware;
