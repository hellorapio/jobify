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
      await userRepository.updateOne(
        {
          email: session.customer_email,
        },
        {
          plan:
            session.amount_total / 100 === 350 ||
            session.amount_total / 100 === 35
              ? "professional"
              : "starter",
          planExpires: session.expiresAt,
        }
      )
    )?.id;
    console.log(session.expiresAt);
    await this.repo.insertOne({
      company,
      currency: session.currency,
      total: session.amount_total / 100,
      plan:
        session.amount_total / 100 === 350 ||
        session.amount_total / 100 === 35
          ? "professional"
          : "starter",
      endsAt: session.expiresAt,
    });
  }
}

export default SubService.getInstance<SubService>();
