import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import UserService from "./user.service";
import UserValidator from "./user.validator";

class UserController {
  static async me(req: Request, res: Response) {
    const user = await UserService.me(req.user.id);
    sendResponse(res, 200, user);
  }

  static async updateMe(req: Request, res: Response) {
    const body = await UserValidator.updateMe(req.body);
    const user = await UserService.updateMe(req.user.id, body);
    sendResponse(res, 200, user);
  }

  static async deleteMe(req: Request, res: Response) {
    await UserService.deleteMe(req.user.id);
    sendResponse(res, 204, undefined, "");
  }
}

export default UserController;
