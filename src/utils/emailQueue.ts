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

emailQueue
  .clean(1000 * 60, 100, "completed")
  .then((jobs) => {
    console.log(`Cleaned ${jobs.length} completed jobs`);
  })
  .catch((error) => {
    console.error(`Failed to clean completed jobs: ${error}`);
  });

const worker = new Worker(
  "Emails",
  async (job: Job<EmailJobData>) => {
    switch (job.data.type) {
      case "welcome":
        await Email.sendWelcome(job.data.data);
        break;
      case "reset-password":
        await Email.sendResetPass(job.data.data);
        break;
      case "verification":
        await Email.sendVerification(job.data.data);
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
