import { NODE_ENV } from "../secrets.js";
import { jwtTokenService } from "../services/jwt/JwtTokenService.js";
import { userService } from "../services/user/UserService.js";
import { sendOtpUtil, verifyOtpUtil } from "../utils/otpService.js";
import { getAccessPayload, getRefreshPayload } from "../utils/userTokenPayload.js";

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
    const { otp, recipient, serviceType, countryCode } = req.body;

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


      // validate user and register
      let user = null;
      try {
        if (serviceType === "phone") {
          user = await userService.getUserByFields({ phone: recipient });
        } else {
          user = await userService.getUserByFields({ email: recipient });
        }
      } catch (error) {
        console.error(error);
        // return res.status(400).json({ status: false, message: "Failed to register" });
      }

      try {
        // Register the user is not exists
        if (!user) {
          const prepareData = {};
          if (serviceType === "phone") {
            prepareData.phone = recipient.trim().slice(recipient.length - 10, recipient.length);
            prepareData.countryCode = countryCode;
          } else {
            prepareData.email = recipient;
          }

          user = await userService.createUser(prepareData);
        }
      } catch (error) {
        console.error(error);
        return res.status(400).json({ status: false, message: "Failed to register" });
      }

      // Generate auth tokens and send
      const accessToken = await jwtTokenService.generateAccessToken(getAccessPayload(user));
      const refreshToken = await jwtTokenService.generateRefreshToken(getRefreshPayload(user));

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "PROD",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // expires in 7days
      });

      return res.status(200).json({
        status: true,
        message: "OTP verified successfully",
        token: accessToken,
        user
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error during OTP verification",
      });
    }
  }

  async refreshTokenController(req, res) {
    // check does the token is present
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({
        status: false,
        message: "No token found",
      });
    }

    let payload = null;
    try {
      payload = await jwtTokenService.verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: "Invalid refresh token",
      });
    }


    try {
      const user = await userService.getUserById(payload.id);
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Invalid token",
        });
      }

      // Generate auth tokens and send
      const accessToken = await jwtTokenService.generateAccessToken(getAccessPayload(user));
      const refreshToken = await jwtTokenService.generateRefreshToken(getRefreshPayload(user));

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "PROD",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // expires in 7days
      });

      // clear old refresh token
      res.clearCookie("refresh_token");

      res.status(200).json({
        status: true,
        message: "OTP verified successfully",
        token: accessToken
      });
    } catch (error) {
      console.error(error);
      // clear old refresh token
      res.clearCookie("refresh_token");
      res.status(401).json({
        status: false,
        message: "Token expired",
      });
    }
  }

  async logout(req, res) {
    try {
      // Clear the refresh token HTTP-only cookie
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      res.status(200).json({
        status: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }
  }
}

const authController = new AuthController();
export { authController };
