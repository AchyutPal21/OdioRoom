import axiosInstance from "./axiosInstance.js";
import { API } from "./endpoints.js";

export const AuthAPI = {
  async sendOtp(payload) {
    try {
      const res = await axiosInstance.post(API.AUTH.SEND_OTP, payload);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "OTP verification failed.";
      throw new Error(message);
    }
  },

  async verifyOtp(payload) {
    try {
      const res = await axiosInstance.post(API.AUTH.VERIFY_OTP, payload);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "OTP verification failed.";
      throw new Error(message);
    }
  },
};
