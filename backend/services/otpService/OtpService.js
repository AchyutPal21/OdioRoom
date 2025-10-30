import crypto from "crypto";
import { OTP_SECRET, OTP_ALGORITHM } from "../../secrets.js";

class OtpService {
  #ttl;

  constructor(ttl = 5 * 60 * 1000) { // default 5 mins
    if (new.target === OtpService) {
      throw new Error("Cannot instantiate abstract class OtpService directly");
    }
    this.#ttl = Date.now() + ttl;
  }

  getTtl() {
    return this.#ttl;
  }

  async generateOtp() {
    try {
      const otp = crypto.randomInt(1000, 9999).toString();
      return otp;
    } catch (error) {
      throw new Error("Failed to generate OTP");
    }
  }


  async hashOtp(recipient, otp) {
    try {
      const hashData = `${recipient}.${otp}.${this.getTtl()}`;
      const hash = crypto.createHmac(OTP_ALGORITHM, OTP_SECRET).update(hashData).digest("hex");
      return hash;
    } catch (error) {
      throw new Error("Failed to hash OTP: " + error.message);
    }
  }


  async verifyOtp(recipient, otp, hashedOtp) {
    const [hashOtp, expiresAt] = hashedOtp.split(".");
    const now = Date.now();

    if (!hashOtp || !expiresAt) {
      throw new Error("Invalid token found");
    }

    if (now > parseInt(expiresAt, 10)) {
      throw new Error("OTP has expired");
    }

    const toHash = `${recipient}.${otp}.${expiresAt}`;
    const hash = crypto.createHmac(OTP_ALGORITHM, OTP_SECRET).update(toHash).digest("hex");

    return hash === hashOtp;
  }

  // Abstract method to implement in subclass
  async sendOtp(recipient, otp) {
    throw new Error("sendOtp() must be implemented in subclass");
  }
}

export { OtpService };