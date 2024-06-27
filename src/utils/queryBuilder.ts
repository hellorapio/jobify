import { Query } from "mongoose";
import { QueryObject } from "../types";

class QueryBuilder<T> {
  constructor(public query: Query<T[], T>, public queryObj: QueryObject) {}

  filter(fields: string[]) {
    let filterObject = structuredClone(this.queryObj);

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
      ...fields,
    ];

    unWantedFields.forEach(
      (element) => delete filterObject[element as keyof QueryObject]
    );

    const regex = /\b(lt|lte|gt|gte|text|in|nin|eq|nq)\b/g;
    const replacement = "$$$1";

    filterObject = JSON.parse(
      JSON.stringify(filterObject).replace(regex, replacement)
    );

    if (this.queryObj.keyword) {
      filterObject.$text = { $search: this.queryObj.keyword };
    }

    const score = { score: { $meta: "textScore" } };

    this.query.find(filterObject, filterObject.$text && score);
    return this;
  }

  sort() {
    if (this.queryObj.sort)
      this.query.sort(this.queryObj.sort.split(",").join(" "));
    else if (this.queryObj.keyword)
      this.query.sort({ score: { $meta: "textScore" } });
    else this.query.sort("createdAt");

    return this;
  }

  paginate() {
    const page = this.queryObj.page || 1;
    const limit = this.queryObj.limit || 20;
    const skips = (page - 1) * limit;

    this.query.skip(skips).limit(limit);

    return this;
  }

  fieldsSelect() {
    if (this.queryObj.fields)
      this.query.select(this.queryObj.fields.split(",").join(" "));
    else this.query.select("");

    return this;
  }
}

export default QueryBuilder;
