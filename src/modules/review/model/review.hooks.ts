import { Schema } from "mongoose";
import { IReview } from "./review.interface";
import userRepository from "../../user/user.repository";

const addHooks = (schema: Schema<IReview>) => {
  schema.pre(/^find/, function (next) {
    //@ts-ignore
    this.select(" -_id");
    //@ts-ignore
    this.populate({
      path: "user",
      select: "name username photo -_id",
    });
    next();
  });

  schema.statics.addRatings = async function (company: any) {
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
      await userRepository.updateOneById(stats[0]._id, {
        ratingsCount: stats[0].count,
        ratingsAverage: +stats[0].avg.toFixed(1),
      });
    else
      await userRepository.updateOneById(company, {
        ratingsCount: 0,
        ratingsAverage: 0,
      });
  };

  schema.post(/^findOneAnd/, async function (doc) {
    if (doc) await doc.constructor.addRatings(doc.company);
  });

  schema.post(/^save/, async function (doc) {
    await doc.constructor.addRatings(doc.company);
  });
};

export default addHooks;
