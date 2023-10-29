import { Query } from "mongoose";
import { QueryObject } from "../types";

class APIFeatures<T> {
  constructor(public query: Query<T[], T>, public queryObj: QueryObject) {}

  filter() {
    // Removing these Fields for now
    let queryObj = structuredClone(this.queryObj);
    const unWantedFields: string[] = ["page", "sort", "fields", "limit"];
    unWantedFields.forEach(
      (element) => delete queryObj[element as keyof QueryObject]
    );

    // Making our Regex for Operators
    const regex = /\b(lt|lte|gt|gte|text|in|nin|eq|nq)\b/g;
    const replacement = "$$$1";
    queryObj = JSON.parse(
      JSON.stringify(queryObj).replace(regex, replacement)
    );
    this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryObj.sort)
      this.query.sort(this.queryObj.sort.split(",").join(" "));
    else this.query.sort("createdAt");

    return this;
  }

  paginate() {
    const page = this.queryObj.page || 1;
    const limit = this.queryObj.limit || 20;
    const skips = (page - 1) * limit;
    this.query.find();
    this.query.skip(skips).limit(limit);

    return this;
  }

  fieldsSelect() {
    if (this.queryObj.fields)
      this.query.select(this.queryObj.fields.split(",").join(" "));
    this.query.select("");

    return this;
  }
}

export default APIFeatures;
