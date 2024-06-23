import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import userService from "./user.service";
import userValidator from "./user.validator";
import BaseController from "../../bases/base.controller";
import { IUser } from "./model/user.interface";
import uploadImg from "../../utils/cloudinary";

class UserController extends BaseController<
  IUser,
  typeof userService,
  typeof userValidator
> {
  constructor() {
    super(userService, userValidator);
    this.me = this.me.bind(this);
  }

  async me(req: Request, res: Response) {
    sendResponse(res, 200, req.user);
  }

  override async get(req: Request, res: Response) {
    const { username } = await this.validator.username(req.params);
    const user = await this.service.get(username);
    sendResponse(res, 200, user);
  }

  override async update(req: Request, res: Response) {
    const body =
      req.user.role === "job seeker"
        ? await this.validator.updateJobSeeker(req.body)
        : await this.validator.updateCompany(req.body);
    if (body.photo !== "")
      body.photo = req.file ? await uploadImg(req.file.path) : undefined;
    const user = await this.service.update(req.user.id, body);
    sendResponse(res, 200, user);
  }

  override async delete(req: Request, res: Response) {
    await this.service.delete(req.user.id);
    sendResponse(res, 204, undefined, "");
  }
}

export default UserController.getInstance<UserController>();
