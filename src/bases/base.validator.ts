import validCatch from "../utils/validCatch";
import { Schema } from "joi";

class BaseValidator {
  constructor(protected joi: Record<string, Schema>) {}

  //@ts-ignore
  protected static instance: this;

  public static getInstance() {
    if (!this.instance)
      //@ts-ignore
      this.instance = new this();
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
}

export default BaseValidator;
