import { createHash, randomBytes } from "crypto";
import userRepository from "../user/user.repository";
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

  async signup(body: Signup, host: string) {
    const token = randomBytes(32).toString("hex");

    const user = await this.repo.insertOne({
      role: body.role,
      email: body.email,
      password: body.password,
      name: body.name,
      verificationToken: createHash("sha256").update(token).digest("hex"),
      verificationTokenExpires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    await Email.sendVerification({
      email: body.email,
      verify: host + "/email-verification/" + token,
      name: body.name,
    });

    return await jwt.sign(user.id);
  }

  async forgotPassword(email: string, host: string) {
    const user = await this.repo.findOne({ email });
    if (!user) throw new NotFound("User is not Found");

    const token = await user.generateToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${host}/reset/${token}`;

    try {
      await Email.sendResetPass({
        resetURL,
        email: user.email,
        name: user.name,
      });
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
    const hashedToken = createHash("sha256").update(token).digest("hex");

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

  async verifyUser(token: string) {
    const hash = createHash("sha256").update(token).digest("hex");
    const user = await this.repo.updateOne(
      {
        verificationToken: hash,
        //@ts-ignore
        verificationTokenExpires: { $gt: Date.now() },
      },
      {
        isVerified: true,
        isVerifiedAt: new Date(),
        $unset: { verificationToken: "", verificationTokenExpires: "" },
      },
      "+email"
    );

    if (!user)
      throw new BadRequest(
        "This Validation link Either not Valid or Expired"
      );

    await Email.sendWelcome({ email: user.email, name: user.name });
  }

  async changeEmail(id: any, host: string, { email, password }: Login) {
    const user = await this.repo.findById(id, "+password");
    if (!user?.correctPassword(password, user.password))
      throw new NotAuthorized("Your password is Incorrect");
    const token = randomBytes(32).toString("hex");

    user.verificationToken = createHash("sha256")
      .update(token)
      .digest("hex");

    user.verificationTokenExpires = new Date(
      Date.now() + 2 * 60 * 60 * 1000
    );
    
    user.email = email;
    user.isVerified = false;
    //@ts-ignore
    user.isVerifiedAt = undefined;
    await user.save({ validateBeforeSave: false });

    await Email.sendVerification({
      name: user.name,
      email,
      verify: host + "/email-verification/" + token,
    });
  }
}

export default AuthService.getInstance();
