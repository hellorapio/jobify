import nodemailer from "nodemailer";
import { EmailOptions } from "../types";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import config from "../config/config";
const { emailPass, emailPort, emailUser, emailHost } = config;

const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort),
    auth: {
      user: emailUser,
      pass: emailPass,
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
