import sendResponse from "../utils/sendResponse";
import BaseService from "./base.service";
import BaseValidator from "./base.validator";
import { Request, Response } from "express";

class BaseController<
  T,
  S extends BaseService<T> = BaseService<T>,
  V extends BaseValidator = BaseValidator
> {
  constructor(protected service: S, protected validator: V) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
  }
  //@ts-ignore
  protected static instance: this;

  public static getInstance() {
    if (!this.instance)
      //@ts-ignore
      this.instance = new this();
    return this.instance;
  }

  async create(req: Request, res: Response) {
    const body = await this.validator.create(req.body);
    const data = await this.service.create(body);
    sendResponse(res, 201, data);
  }

  async get(req: Request, res: Response) {
    const { id } = await this.validator.id(req.params);
    const data = await this.service.get(id);
    sendResponse(res, 200, data);
  }

  async update(req: Request, res: Response) {
    const { id } = await this.validator.id(req.params);
    const body = await this.validator.update(req.body);
    const data = await this.service.update(id, body);
    sendResponse(res, 200, data);
  }

  async delete(req: Request, res: Response) {
    const { id } = await this.validator.id(req.params);
    await this.service.delete(id);
    sendResponse(res, 204);
  }

  async getAll(_: Request, res: Response) {
    const that = this;
    const data = await that.service.getAll();
    sendResponse(res, 200, { results: data.length, data });
  }
}

export default BaseController;
