import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import userService from "./user.service";
import userValidator from "./user.validator";
import BaseController from "../../bases/base.controller";
import { IUser } from "./model/user.interface";

class UserController extends BaseController<IUser, typeof userService> {
  constructor() {
    super(userService, userValidator);
    this.me = this.me.bind(this);
  }

  async me(req: Request, res: Response) {
    const user = await this.service.me(req.user.id);
    sendResponse(res, 200, user);
  }

  override async delete(req: Request, res: Response) {
    await this.service.delete(req.user.id);
    sendResponse(res, 204, undefined, "");
  }
}

export default UserController.getInstance<UserController>();
