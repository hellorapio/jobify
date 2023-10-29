import { Schema } from "mongoose";
import { IApplicant } from "./applicant.interface";
import jobRepository from "../../job/job.repository";

const addHooks = async (schema: Schema<IApplicant>) => {
  schema.statics.calculateApplicants = async function (job: string) {
    const applicants = await this.aggregate([
      { $match: { job } },
      { $group: { _id: job, count: { $sum: 1 } } },
    ]);

    if (applicants.length > 0)
      await jobRepository.updateOne(
        { slug: applicants[0]._id },
        { applicants: applicants[0].count }
      );
    else await jobRepository.updateOne({ slug: job }, { applicants: 0 });
  };

  schema.post("save", async function (doc) {
    console.log(doc.job);
    //@ts-ignore
    await doc.constructor.calculateApplicants(doc.job);
  });

  schema.post("findOneAndDelete", async function (doc) {
    if (doc) await doc.constructor.calculateApplicants(doc.job);
  });
};

export default addHooks;
