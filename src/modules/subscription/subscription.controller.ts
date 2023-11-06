import { Request, Response } from "express";
import BaseController from "../../bases/base.controller";
import sendResponse from "../../utils/sendResponse";
import ISub from "./model/subscription.interface";
import subscriptionService from "./subscription.service";
import subscriptionValidator from "./subscription.validator";
import stripe from "../../utils/stripe";

class SubController extends BaseController<
  ISub,
  typeof subscriptionService
> {
  constructor() {
    super(subscriptionService, subscriptionValidator);
    this.getSession = this.getSession.bind(this);
  }

  async getSession(req: Request, res: Response) {
    const { email } = req.user;
    const data = await this.validator.create(req.params);
    const session = await stripe.createStripe({
      plan: data.plan,
      duration: data.duration,
      email,
      success: req.protocol + "://" + req.hostname + "/dashboard",
      cancel: req.protocol + "://" + req.hostname + "/",
    });
    sendResponse(res, 200, session);
  }

  async webhook(req: Request, res: Response) {
    const event = await stripe.webookListener(req.body, req.headers);
    await this.service.webhook(event);
    sendResponse(res, 200, "Received");
  }
}

export default SubController.getInstance<SubController>();
