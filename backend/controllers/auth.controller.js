import { NODE_ENV } from "../secrets.js";
import { sendOtpUtil, verifyOtpUtil } from "../utils/otpService.js";

class AuthController {
  constructor() {
    this.sendOtpController = this.sendOtpController.bind(this);
    this.verifyOtpController = this.verifyOtpController.bind(this);
  }

  async sendOtpController(req, res) {
    const { recipient, serviceType } = req.body;

    if (!serviceType || typeof serviceType !== "string" || !["email", "phone"].includes(serviceType.toLowerCase())) {
      return res.status(400).json({ status: false, message: "Invalid service type found" });
    }

    if (!recipient && recipient.length > 5) {
      return res.status(400).json({ status: false, message: "Required field is missing" });
    }

    let serviceName = "";
    let recipientValue = "";

    switch (serviceType.toLowerCase()) {
      case "email":
        recipientValue = recipient;
        serviceName = "email";
        break;
      case "phone":
        recipientValue = recipient;
        serviceName = "phone";
        break;
    }

    try {
      const hashOtp = await sendOtpUtil(serviceName, recipientValue);

      // Sending hash Otp securely in HTTP-only cookie
      res.cookie("otp_hash", hashOtp, {
        httpOnly: true,
        secure: NODE_ENV === "PROD", // send only over HTTPS in production
        sameSite: "strict",
        maxAge: 5 * 60 * 1000, // expires in 5 minutes
      });

      res.status(200).json({
        status: true,
        message: "Otp sent successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: false, message: "Failed to send verification code, try after some time" });
    }
  }

  async verifyOtpController(req, res) {
    const { otp, recipient, serviceType } = req.body;

    // Validations
    if (!otp || !recipient || !serviceType) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired or not generated",
      });
    }

    // Checking the service type
    if (!["email", "phone"].includes(serviceType)) {
      return res.status(400).json({
        status: false,
        message: "Invalid service type found",
      });
    }

    // Get the cookie send from sendOtp controller
    const otpHashCookie = req.cookies?.otp_hash;
    if (!otpHashCookie) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired or not generated",
      });
    }

    try {
      // verify the OTP
      const isValid = await verifyOtpUtil(serviceType, recipient, otp, otpHashCookie);
      if (!isValid) {
        return res.status(400).json({ status: false, message: "Invalid OTP" });
      }

      // Clear the cookie after successful verification
      res.clearCookie("otp_hash");

      return res.status(200).json({
        status: true,
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error during OTP verification",
      });
    }
  }
}

const authController = new AuthController();
export { authController };
