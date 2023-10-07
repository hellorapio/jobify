import nodemailer from "nodemailer";
import { EmailOptions } from "../types";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import config from "../config/config";

interface ResetPass {
  resetURL: string;
  email: string;
}

const {
  email: { pass, port, user, host },
} = config;

class Email {
  static async sendEmail(options: EmailOptions) {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      auth: {
        user,
        pass,
      },
    } as SMTPConnection.Options);

    const emailOptions = {
      from: options.from,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(emailOptions);
  }

  static async sendResetPass(payload: ResetPass) {
    const message = `We received a request to reset your password for your account on Jobify. If you did not request this change, please ignore this message.
To reset your password, please click on the following link: ${payload.resetURL}
If you have any trouble resetting your password, please don't hesitate to contact our support team at [EMAIL] for further assistance.
Thank you,`;

    await this.sendEmail({
      from: "Director of Jobify, Please Change your Pass <info@hellorapio.me>",
      message,
      email: payload.email,
      subject: "Jobify: Password Reset Link (Valid for 1 Hour)",
    });
  }

  static async sendWelcome(email: string) {
    await this.sendEmail({
      from: "Jobify <info@hellorapio.me",
      message: "Welcome to Jobify, our Beautiful Platform",
      email,
      subject: "Welcome to Jobify, our Beautiful Platform",
    });
  }
}

export default Email;
