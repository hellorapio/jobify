import validCatch from "../utils/validCatch";
import { Schema } from "joi";

class BaseValidator {
  constructor(protected joi: Record<string, Schema>) {}

  protected static instance: any;

  public static getInstance<T>(): T {
    if (!this.instance) this.instance = new (this as any)();
    return this.instance;
  }

  async id(data: object) {
    return await validCatch(this.joi.id, data);
  }

  async ids(data: object) {
    return await validCatch(this.joi.ids, data);
  }

  async create(data: object) {
    return await validCatch(this.joi.create, data);
  }

  async update(data: object) {
    return await validCatch(this.joi.update, data);
  }

  async username(data: object) {
    return await validCatch(this.joi.username, data);
  }

  async slug(data: object) {
    return await validCatch(this.joi.slug, data);
  }

  async query(data: object) {
    return await validCatch(this.joi.query, data);
  }

  async withIn(data: object) {
    return await validCatch(this.joi.withIn, data);
  }
}

export default BaseValidator;
