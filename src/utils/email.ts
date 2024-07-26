import nodemailer from "nodemailer";
import { EmailOptions, ResetPass, Verification, Welcome } from "../types";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import config from "../config/config";
import pug from "pug";
import { htmlToText } from "html-to-text";

const {
  email: { pass, port, user, host },
} = config;

export default class Email {
  static transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    auth: {
      user,
      pass,
    },
  } as SMTPConnection.Options);

  static async sendEmail(options: EmailOptions) {
    await this.transporter.sendMail(options);
  }

  static async sendResetPass({ resetURL, email, name }: ResetPass) {
    const html = pug.renderFile(
      `${__dirname}/../../public/views/email/reset.pug`,
      {
        name,
        resetURL,
        subject: "Jobify: Password Reset Link (Valid for 1 Hour)",
      }
    );

    const text = htmlToText(html);

    await this.sendEmail({
      from: "info@hellorapio.me",
      subject: "Jobify: Password Reset Link (Valid for 1 Hour)",
      text,
      html,
      to: email,
    });
  }

  static async sendWelcome({ email, name }: Welcome) {
    const html = pug.renderFile(
      `${__dirname}/../../public/views/email/welcome.pug`,
      {
        name,
        subject: "Jobify: Welcome to Jobify, our Beautiful Platform",
      }
    );

    const text = htmlToText(html);
    await this.sendEmail({
      from: "info@hellorapio.me",
      subject: "Welcome to Jobify, our Beautiful Platform",
      text,
      to: email,
      html,
    });
  }

  static async sendVerification({ name, verify, email }: Verification) {
    const html = pug.renderFile(
      `${__dirname}/../../public/views/email/verify.pug`,
      {
        name,
        verify,
        subject: "Jobify: Please verify your email address",
      }
    );
    const text = htmlToText(html);
    await this.sendEmail({
      from: "info@hellorapio.me",
      subject: "Jobify: Please verify your email address",
      text,
      html,
      to: email,
    });
  }
}
