import crypto from "crypto";
import userRepository from "../user/user.repository";
import jwt from "../../utils/jwt";
import NotAuthorized from "../../errors/notAuthorized";
import NotFound from "../../errors/notFound";
import InternalError from "../../errors/internalError";
import BadRequest from "../../errors/badRequest";
import Email from "../../utils/email";
import { Login, Signup, UpdatePassword } from "../../types";
import { Request } from "express";

class AuthService {
  static async login({ email, password }: Login) {
    const user = await userRepository.findOne({ email }, "+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      throw new NotAuthorized("Incorrect Email or Password");

    return await jwt.sign(user.id);
  }

  static async signup(body: Signup) {
    const user = await userRepository.insertOne({
      role: body.role,
      email: body.email,
      password: body.password,
    });

    return await jwt.sign(user.id);
  }

  static async forgotPassword(email: string, req: Request) {
    const user = await userRepository.findOne({ email });
    if (!user) throw new NotFound("User is not Found");

    const token = await user.generateToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.hostname}/api/v1/reset/${token}`;

    try {
      await Email.sendResetPass({ resetURL, email: user.email });
    } catch (error) {
      user.passwordResetExpires = undefined;
      user.passwordResetToken = undefined;
      await user.save({ validateBeforeSave: false });

      throw new InternalError(
        "There was an Error Sending this Email, Please try again Later"
      );
    }
  }

  static async resetPassword(token: string, password: string) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await userRepository.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      throw new BadRequest(
        "There is No Token on this Path or Maybe it has Expired"
      );

    user.password = password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    return await jwt.sign(user.id);
  }

  static async updatePassword(
    id: string,
    { currentPassword, password }: UpdatePassword
  ) {
    const user = await userRepository.findById(id, "+password");

    if (!user) throw new NotFound("There is no user");

    if (!(await user.correctPassword(currentPassword, user.password)))
      throw new NotAuthorized("Your password is Incorrect");

    user.password = password;
    await user.save();

    return await jwt.sign(user.id);
  }

  static async logout(id: string) {
    await userRepository.updateOneById(id, { loggedOutAt: new Date() });
  }
}

export default AuthService;
