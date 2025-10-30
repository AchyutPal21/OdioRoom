import nodemailer from "nodemailer";
import {OtpService} from "./OtpService.js";
import { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } from "../../secrets.js";
import { emailVerificationTemp } from "../../templates/emailTemplates.js";

class EmailOtpService extends OtpService {
  #transporter = null;
  constructor() {
    super(); // optional: pass custom ttl if needed
    this.#transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendOtp(recipient, otp) {
    try {
      if (!recipient) {
        throw new Error("Recipient email is required");
      }

      const mailOptions = {
        from: `"Odio Verification" <verify@odio.com>`,
        to: recipient,
        subject: "Your OTP Code for ODIO",
        html: emailVerificationTemp(otp)
      };

      await this.#transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email OTP:", error);
      throw new Error("Failed to send OTP email");
    }
  }
}

export { EmailOtpService };