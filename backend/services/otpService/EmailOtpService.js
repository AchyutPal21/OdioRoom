import nodemailer from "nodemailer";
import OtpService from "./OtpService.js";
import { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } from "../../secrets.js";
import { emailVerificationTemp } from "../../templates/emailTemplates.js";

class EmailOtpService extends OtpService {
  #transporter = null;
  constructor() {
    super(); // optional: pass custom ttl if needed
    this.#transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendOtp(recipient, otp) {
    try {
      if (!recipient) {
        throw new Error("Recipient email is required");
      }

      const mailOptions = {
        from: `"Odio Verification" <${EMAIL_USER}>`,
        to: recipient,
        subject: "Your OTP Code for ODIO",
        html: emailVerificationTemp(otp)
      };

      await this.#transporter.sendMail(mailOptions);
      console.log("Email OTP sent to:", recipient);
    } catch (error) {
      console.error("Error sending email OTP:", error);
      throw new Error("Failed to send OTP email");
    }
  }
}

export { EmailOtpService };