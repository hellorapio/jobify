import BaseService from "../../bases/base.service";
import userRepository from "../user/user.repository";
import ISub from "./model/subscription.interface";
import subscriptionRepository from "./subscription.repository";

class SubService extends BaseService<ISub> {
  constructor() {
    super(subscriptionRepository);
  }

  async webhook(event: any) {
    if (event.type !== "checkout.session.completed") return;
    const session = event.data.object;
    const company = (
      await userRepository.findOne({
        email: session.customer_email,
      })
    )?.id;

    await this.repo.insertOne({
      company,
      currency: session.line_items[0].price_data.currency,
      total: session.line_items[0].price_data.unit_amount_decimal / 100,
      plan: session.line_items[0].price_data.product_data.name,
      endsAt:
        session.line_items[0].price_data.recurring.interval === "year"
          ? new Date(Date.now() + 1000 * 3600 * 24 * 365)
          : new Date(Date.now() + 1000 * 3600 * 24 * 30),
    });
  }
}

export default SubService.getInstance<SubService>();
