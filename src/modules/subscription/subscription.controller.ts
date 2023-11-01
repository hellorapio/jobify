import BaseController from "../../bases/base.controller";
import ISub from "./model/subscription.interface";
import subscriptionService from "./subscription.service";
import subscriptionValidator from "./subscription.validator";

class SubController extends BaseController<ISub> {
  constructor() {
    super(subscriptionService, subscriptionValidator);
  }
}

export default SubController.getInstance<SubController>();
