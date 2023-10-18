import crypto from "crypto";
import { Request } from "express";
import userRepository from "../user/user.repository";
import WorkerRepository from "../worker/worker.repository";
import CompanyRepository from "../company/company.repository";
import jwt from "../../utils/jwt";
import Email from "../../utils/email";
import NotAuthorized from "../../errors/notAuthorized";
import NotFound from "../../errors/notFound";
import InternalError from "../../errors/internalError";
import BadRequest from "../../errors/badRequest";
import { Login, Signup, UpdatePassword } from "../../types";

class AuthService {
  private static instance: AuthService;
  private constructor(private repo: typeof userRepository) {}
  public static getInstance() {
    if (!AuthService.instance)
      AuthService.instance = new AuthService(userRepository);
    return AuthService.instance;
  }

  async login({ email, password }: Login) {
    const user = await this.repo.findOne({ email }, "+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      throw new NotAuthorized("Incorrect Email or Password");

    return await jwt.sign(user.id);
  }

  async signup(body: Signup) {
    // Refactor to transactions Easily
    const user = await this.repo.insertOne({
      role: body.role,
      email: body.email,
      password: body.password,
    });

    if (body.role === "company")
      await CompanyRepository.insertOne({
        userId: user._id,
        name: body.name,
      });
    else if (body.role === "worker")
      await WorkerRepository.insertOne({
        userId: user._id,
        name: body.name,
      });

    return await jwt.sign(user.id);
  }

  async forgotPassword(email: string, req: Request) {
    const user = await this.repo.findOne({ email });
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

  async resetPassword(token: string, password: string) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await this.repo.findOne({
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

  async updatePassword(
    id: string,
    { currentPassword, password }: UpdatePassword
  ) {
    const user = await this.repo.findById(id, "+password");

    if (!user) throw new NotFound("There is no user");

    if (!(await user.correctPassword(currentPassword, user.password)))
      throw new NotAuthorized("Your password is Incorrect");

    user.password = password;
    await user.save();

    return await jwt.sign(user.id);
  }

  async logout(id: string) {
    await this.repo.updateOneById(id, { loggedOutAt: new Date() });
  }
}

export default AuthService.getInstance();
