import twilio from "twilio";
import {OtpService} from "./OtpService.js";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER,
} from "../../secrets.js";

class SmsOtpService extends OtpService {
  #client
  constructor() {
    super(); // optional: pass custom ttl if needed
    this.#client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, { lazyLoading: true });
  }

  async sendOtp(recipient, otp) {
    try {
      if (!recipient) {
        throw new Error("Recipient phone number is required");
      }

      const message = await this.#client.messages.create({
        body: `Your Odio verification code is ${otp}. It will expire in 5 minutes.`,
        from: TWILIO_FROM_NUMBER,
        to: recipient,
      });

    } catch (error) {
      console.error("Error sending SMS OTP:", error);
      throw new Error("Failed to send OTP SMS");
    }
  }
}

export { SmsOtpService };