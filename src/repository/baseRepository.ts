import { Model } from "mongoose";

class BaseRepository<T> {
  constructor(public model: Model<T>) {}

  async findOne(filter: Partial<T>) {
    return await this.model.findOne(filter);
  }

  async updateOne(filter: Partial<T>, payload: Partial<T>) {
    return await this.model.findOneAndUpdate(filter, payload, {
      new: true,
    });
  }

  async insertOne(payload: Partial<T>) {
    return await this.model.create(payload);
  }
}
