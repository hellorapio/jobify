import { IJob } from "./job.interface";
import { Schema, UpdateQuery } from "mongoose";
import slugify from "slugify";
import { randomBytes } from "crypto";
import userRepository from "../../user/user.repository";
import addressDetails from "../../../utils/addressDetails";

const addHooks = (schema: Schema<IJob>) => {
  // Add active false Hook on jobs

  schema.pre("save", async function (next) {
    if (!this.isNew) return next();
    if (this.address) {
      const { lon, lat } = await addressDetails(this.address);
      this.location.coordinates = [lon, lat];
    }

    this.slug = slugify(this.title + randomBytes(3).toString("hex"), {
      lower: true,
      trim: true,
      remove: /[#(){}[\].$*]/,
    });
    next();
  });

  schema.statics.calculateJobs = async function (company: any) {
    const jobsNumber = await this.aggregate([
      { $match: { company, isActive: true } },
      { $group: { _id: company, count: { $sum: 1 } } },
    ]);
    if (jobsNumber.length > 0)
      await userRepository.updateOneById(jobsNumber[0]._id, {
        jobs: jobsNumber[0].count,
      });
    else
      await userRepository.updateOneById(company, {
        jobs: 0,
      });
  };

  schema.post("save", async function (doc) {
    //@ts-ignore
    await doc.constructor.calculateJobs(doc.company);
  });

  schema.post("findOneAndUpdate", async function (doc) {
    if (doc && this.get("$set").isActive === false)
      await doc.constructor.calculateJobs(doc.company);
  });

  schema.pre("find", function (next) {
    this.find({ isActive: true });
    next();
  });

  schema.pre<UpdateQuery<IJob>>("findOneAndUpdate", async function (next) {
    if (this.getUpdate().address) {
      const { lon, lat } = await addressDetails(this.getUpdate().address);
      this.getUpdate().location = {
        coordinates: [lon, lat],
        type: "Point",
      };
    }
    next();
  });

  schema.pre("findOneAndUpdate", async function (next) {
    if (
      //@ts-ignore
      this.getUpdate().isActive === false ||
      //@ts-ignore
      this.getUpdate().applicants >= 0
    )
      return next();
    this.populate({
      path: "company",
      select: "-_id name photo username",
    });
    next();
  });
};

export default addHooks;
