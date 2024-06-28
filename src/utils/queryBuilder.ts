import { Model, Query } from "mongoose";
import { QueryObject } from "../types";

class QueryBuilder<T> {
  constructor(public model: Model<T>, public expressQuery: QueryObject) {}

  query: Query<T[], T> = this.model.find();
  filterQuery: QueryObject = {};

  async execute() {
    this.filter().sort().fieldsSelect().paginate();
    return await Promise.all([
      this.query.exec(),
      this.model.countDocuments(this.filterQuery).exec(),
    ]);
  }

  filter() {
    this.filterQuery = structuredClone(this.expressQuery);

    const unWantedFields: string[] = [
      "page",
      "sort",
      "fields",
      "limit",
      "distance",
      "unit",
      "keyword",
      "lng",
      "lat",
    ];

    unWantedFields.forEach(
      (element) => delete this.filterQuery[element as keyof QueryObject]
    );

    const regex = /\b(lt|lte|gt|gte|text|in|nin|eq|nq)\b/g;
    const replacement = "$$$1";

    this.filterQuery = JSON.parse(
      JSON.stringify(this.filterQuery).replace(regex, replacement)
    );

    if (this.expressQuery.keyword) {
      this.filterQuery.$text = { $search: this.expressQuery.keyword };
    }

    const score = { score: { $meta: "textScore" } };

    this.query.find(this.filterQuery, this.filterQuery.$text && score);

    return this;
  }

  sort() {
    if (this.expressQuery.sort)
      this.query.sort(this.expressQuery.sort.split(",").join(" "));
    else if (this.expressQuery.keyword)
      this.query.sort({ score: { $meta: "textScore" } });
    else this.query.sort("createdAt");

    return this;
  }

  paginate() {
    const page = this.expressQuery.page || 1;
    const limit = this.expressQuery.limit || 20;
    const skips = (page - 1) * limit;

    this.query.skip(skips).limit(limit);

    return this;
  }

  fieldsSelect() {
    if (this.expressQuery.fields)
      this.query.select(this.expressQuery.fields.split(",").join(" "));
    else this.query.select("");

    return this;
  }
}

export default QueryBuilder;
