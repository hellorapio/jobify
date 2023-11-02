import nodemailer from "nodemailer";
import { EmailOptions } from "../types";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import config from "../config/config";

type ResetPass = {
  resetURL: string;
  email: string;
};

type Verification = {
  verify: string;
  email: string;
  name: string;
};

type Welcome = {
  email: string;
  name: string;
};

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

  static async sendWelcome({ email, name }: Welcome) {
    const message = `Dear ${name},
    Thank you for signing up for our services. To ensure the security and accuracy of your account,`;
    await this.sendEmail({
      from: "info@hellorapio.me",
      subject: "Welcome to Jobify, our Beautiful Platform",
      message,
      email,
    });
  }

  static async sendVerification({ name, verify, email }: Verification) {
    const message = `Dear ${name},
    Thank you for signing up for our services. To ensure the security and accuracy of your account,
    we require you to verify your email address. 
    This step is essential to access all the features and benefits our platform has to offer
    
    Please follow the instructions below to complete the verification process:
    
    Click on the following link: ${verify}
    
    If the link doesn't work, you can copy and paste it into your web browser's address bar.
    
    You will be directed to a verification page.
    
    Follow the on-screen instructions to confirm your email address.
    
    If you did not sign up for our services or did not request this email, please ignore it. 
    Your account will not be activated unless you complete the verification process.
    
    Thank you for choosing our services. If you have any questions or need assistance, 
    lease don't hesitate to contact our support team at fake@jobify.com`;

    await this.sendEmail({
      from: "info@jobify.me",
      subject: "Jobify: Please verify your email address",
      message,
      email,
    });
  }
}

export default Email;
