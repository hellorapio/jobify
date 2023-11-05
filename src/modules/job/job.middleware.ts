import { NextFunction, Request, Response } from "express";
import ipDetails from "../../utils/ipDetails";
import addressDetails from "../../utils/addressDetails";

// APIFeaturs Implementation Also with other jobs

class JobMiddleware {
  static async JobsWithIn(req: Request, _: Response, next: NextFunction) {
    if (!req.query.lat || !req.query.lng) {
      if (req.query.address) {
        const details = await addressDetails(req.query.address as string);
        const { lat, lon } = details;
        req.query.lng = lon;
        req.query.lat = lat;
      } /* else if (req.user.address && req.user.role !== "company") {
        req.query.lng = req.user.livesIn.coordinates[0].toString();
        req.query.lat = req.user.livesIn.coordinates[1].toString();
      } */ else {
        const { latitude, longitude } = await ipDetails(`${req.ip}`);
        req.query.lng = longitude;
        req.query.lat = latitude;
      }
    }

    next();
  }

  static async wantedJobs(req: Request, _: Response, next: NextFunction) {
    req.query.limit = "5";
    req.query.fields = "title,salary.value";
    req.query.sort = "-salary";
    next();
  }
}

export default JobMiddleware;
