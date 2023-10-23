import { Schema } from "mongoose";
import { IReview } from "./review.interface";
import companyRepository from "../../company/company.repository";

const addHooks = (schema: Schema<IReview>) => {
  schema.virtual("userData", {
    ref: "Worker",
    localField: "user",
    foreignField: "user",
    justOne: true,
  });

  schema.virtual("companyData", {
    ref: "Company",
    localField: "company",
    foreignField: "username",
    justOne: true,
  });

  schema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate({
      path: "userData",
      select: "name username photo -_id -user",
    });
    next();
  });

  schema.statics.addRatings = async function (company: string) {
    const stats = await this.aggregate([
      { $match: { company } },
      {
        $group: {
          _id: company,
          count: { $sum: 1 },
          avg: { $avg: "$rate" },
        },
      },
    ]);

    if (stats.length > 0)
      await companyRepository.updateOne(
        { username: company },
        { ratingsCount: stats[0].count, ratingsAverage: +stats[0].avg.toFixed(1) }
      );
  };

  schema.post("save", async function () {
    //@ts-ignore
    await this.constructor.addRatings(this.company);
  });

  schema.post(/^findOneAnd/, async function (doc) {
    if (doc) await doc.constructor.addRatings(doc.company);
  });
};

export default addHooks;
