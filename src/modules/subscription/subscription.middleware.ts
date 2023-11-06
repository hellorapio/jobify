import { NextFunction, Request, Response } from "express";
import BadRequest from "../../errors/badRequest";

class SubscriptionMiddleware {
  static async checkPlan(req: Request, _: Response, next: NextFunction) {
    if (new Date(req.user.planExpires).getTime() > new Date().getTime())
      throw new BadRequest("You are already subscribed to a plan");

    next();
  }
}

export default SubscriptionMiddleware;
