import BaseService from "../../bases/base.service";
import ISub from "./model/subscription.interface";
import subscriptionRepository from "./subscription.repository";

class SubService extends BaseService<ISub> {
  constructor() {
    super(subscriptionRepository);
  }
}

export default SubService.getInstance<SubService>();
