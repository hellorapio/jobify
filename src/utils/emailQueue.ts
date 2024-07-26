import { Queue, Worker, Job } from "bullmq";
import redis from "../core/redis";
import Email from "./email";
import { EmailJobData } from "../types";

export const emailQueue = new Queue<EmailJobData>("Emails", {
  connection: redis,
  streams: {
    events: {
      maxLen: 10,
    },
  },
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
  { connection: redis, removeOnComplete: { age: 60 }, concurrency: 100 }
);

worker.on("completed", async (job) => {
  // Should be storing job logs
  // also there should be an event for failed jobs
  // logging in server is just enough for now
  console.log(`this job ${job.id} has been completed`);
});
