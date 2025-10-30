import { EmailOtpService } from "../services/otpService/EmailOtpService.js";
import { SmsOtpService } from "../services/otpService/SmsOtpService.js";

async function sendOtpUtil(serviceName, recipient) {
  if (!["email", "phone"].includes(serviceName)) {
    throw new Error("found invalid service type");
  }

  let otpService = null;
  switch (serviceName) {
    case "email":
      otpService = new EmailOtpService();
      break;
    case "phone":
      otpService = new SmsOtpService();
      break;
    default:
      throw Error("Invalid service type");
  }

  if (!otpService) {
    throw new Error("OTP Service could not be initialized");
  }

  try {
    const otp = await otpService.generateOtp();
    const hashOtp = await otpService.hashOtp(recipient, otp);
    await otpService.sendOtp(recipient, otp);
    return `${hashOtp}.${otpService.getTtl()}`;
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
}

async function verifyOtpUtil(serviceName, recipient, otp, hashedOtp) {
  try {
    // initialize the correct service (email/phone)
      let otpService = null;
      switch (serviceName.toLowerCase()) {
        case "email":
          otpService = new EmailOtpService();
          break;
        case "phone":
          otpService = new SmsOtpService();
          break;
        default:
          throw Error("Invalid service type");

      }

      // verify the OTP
      const verification = await otpService.verifyOtp(recipient, otp, hashedOtp);
      return verification;
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
}


export { sendOtpUtil, verifyOtpUtil }