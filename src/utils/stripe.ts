import Stripe from "stripe";
import config from "../config/config";

type StripeOptions = {
  plan: "starter" | "professional";
  duration: "monthly" | "annually";
  email: string;
  success: string;
  cancel: string;
};

const getPlanData = async (plan: string, duration: string) => {
  switch (plan) {
    case "starter":
      return duration === "annually"
        ? {
            price: "19999.99",
            plan,
            duration,
            description: "Annual starter Plan",
          }
        : {
            price: "1999.99",
            plan,
            duration,
            description: "Monthly starter Plan",
          };
      break;
    case "professional":
      return duration === "annually"
        ? {
            price: "34999.99",
            plan,
            duration,
            description: "Annual Professional Plan",
          }
        : {
            price: "3499.99",
            plan,
            duration,
            description: "Monthly Professional Plan",
          };
      break;
    default:
      return {};
      break;
  }
};

const createStripe = async (options: StripeOptions) => {
  const data = await getPlanData(options.plan, options.duration);
  return await new Stripe(config.apis.stripe).checkout.sessions.create({
    payment_method_types: ["card", "paypal"],
    success_url: options.success,
    cancel_url: options.cancel,
    customer_email: options.email,
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: data.plan + " plan",
            description: data.description,
          },
          unit_amount_decimal: data.price,
          recurring: {
            interval: data.duration === "annually" ? "year" : "month",
          },
        },
        quantity: 1,
      },
    ],
  });
};

export default createStripe;
