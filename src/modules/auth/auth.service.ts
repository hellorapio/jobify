import crypto from "crypto";
import User from "../users/user.model";
import sendEmail from "../../utils/email";
import jwt from "../../utils/jwt";
import NotAuthorized from "../../errors/notAuthorized";
import NotFound from "../../errors/notFound";
import InternalError from "../../errors/internalError";
import BadRequest from "../../errors/badRequest";

class AuthService {
  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      throw new NotAuthorized("Incorrect Email or Password");

    return await jwt.sign(user._id);
  }

  static async signup({
    role,
    email,
    password,
  }: {
    role: string;
    email: string;
    password: string;
  }) {
    if (role != "company") role = "worker";
    const user = await User.create({
      role,
      email,
      password,
    });

    return await jwt.sign(user._id);
  }

  static async forgotPassword(
    email: string,
    protocol: string,
    host: string
  ) {
    const user = await User.findOne({ email });
    if (!user) throw new NotFound("User is not Found");

    const token = await user.generateToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${protocol}://${host}/api/v1/reset/${token}`;

    const message = `
  We received a request to reset your password for your account on Jobify. If you did not request this change, please ignore this message.
  
  To reset your password, please click on the following link: ${resetURL}
  
  If you have any trouble resetting your password, please don't hesitate to contact our support team at [EMAIL] for further assistance.
  
  Thank you,`;
    try {
      await sendEmail({
        email: user.email,
        message: message,
        subject: "Jobify: Password Reset Link (Valid for 1 Hour)",
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

  static async resetPassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
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

    return await jwt.sign(user._id);
  }

  static async updatePassword(
    id: string,
    {
      currentPassword,
      password,
    }: {
      currentPassword: string;
      password: string;
    }
  ) {
    const user = await User.findById(id).select("+password");

    if (!user) throw new NotFound("There is no user");

    if (!(await user.correctPassword(currentPassword, user.password)))
      throw new NotAuthorized("Your password is Incorrect");

    user.password = password;
    await user.save();

    return await jwt.sign(user._id);
  }

  static async logout(id: string) {
    await User.findByIdAndUpdate(id, { lastLogout: Date.now() });
  }
}

export default AuthService;
