import mongoose, { Model } from "mongoose";
import { QueryObject } from "../types";

class APIFeatures {
  constructor(public query: any, public expressQuery: QueryObject) {
    this.query = query;
    this.expressQuery = expressQuery;
  }

  filter() {
    // Removing these Fields for now
    let queryObj = structuredClone(this.expressQuery);
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
    if (this.expressQuery.sort)
      this.query.sort(this.expressQuery.sort.split(",").join(" "));
    else this.query.sort("datePosted");

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
    this.query.select("-__v");

    return this;
  }
}

export default APIFeatures;
