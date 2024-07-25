import { Queue, Worker, Job } from "bullmq";
import redis from "../core/redis";
import Email, { Verification, Welcome, ResetPass } from "./email";

type EmailJobData =
  | {
      type: "reset-password";
      data: ResetPass;
    }
  | { type: "welcome"; data: Welcome }
  | {
      type: "verification";
      data: Verification;
    };

export const emailQueue = new Queue<EmailJobData>("Emails", {
  connection: redis,
});

const worker = new Worker(
  "Emails",
  async (job: Job<EmailJobData>) => {
    const { type, data } = job.data;
    switch (type) {
      case "welcome":
        await Email.sendWelcome(data);
        break;
      case "reset-password":
        await Email.sendResetPass(data);
        break;
      case "verification":
        await Email.sendVerification(data);
        break;
      default:
        throw new Error("Wrong job type");
        break;
    }
  },
  { connection: redis, removeOnComplete: { age: 10 } }
);

worker.on("completed", async (job) => {
  console.log(`this job ${job.id} has been completed`);
});
