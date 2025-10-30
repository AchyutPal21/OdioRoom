import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/send-otp", authController.sendOtpController);
authRouter.post("/verify-otp", authController.verifyOtpController);

export { authRouter };