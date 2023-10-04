import nodemailer from "nodemailer";
import { EmailOptions } from "../types";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import config from "../config/config";

const {
  email: { pass, port, user, host },
} = config;

const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    auth: {
      user,
      pass,
    },
  } as SMTPConnection.Options);

  const emailOptions = {
    from: "Director of Jobify, Please Change your Pass <info@hellorapio.me>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(emailOptions);
};

export default sendEmail;
