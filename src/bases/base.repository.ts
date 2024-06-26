import { Model, PipelineStage } from "mongoose";

class BaseRepository<T> {
  constructor(protected model: Model<T>) {}

  protected static instance: any;

  public static getInstance<T>(): T {
    if (!this.instance) this.instance = new (this as any)();
    return this.instance;
  }

  async insertOne(payload: Partial<T>) {
    return await this.model.create(payload);
  }

  async countDocs(filter: Partial<T>) {
    return await this.model.countDocuments(filter);
  }

  async find(filter: Partial<T> | any) {
    return await this.model.find(filter);
  }

  async findOne(filter: Partial<T>) {
    return await this.model.findOne(filter);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async updateOne(filter: Partial<T>, payload: Partial<T> | any) {
    return await this.model.findOneAndUpdate(filter, payload, {
      new: true,
    });
  }
  async updateMany(filter: Partial<T>, payload: Partial<T> | any) {
    return await this.model.updateMany(filter, payload, {
      new: true,
    });
  }

  async updateOneById(id: string, payload: Partial<T>) {
    return await this.model.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteOne(filter: Partial<T>) {
    return await this.model.findOneAndDelete(filter);
  }

  async deleteOneById(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async aggregate(pipeline: PipelineStage[]) {
    return await this.model.aggregate(pipeline);
  }
}

export default BaseRepository;
