const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SEND_OTP: "/auth/send-otp",
    VERIFY_OTP: "/auth/verify-otp",
    REFRESH: "/auth/refresh-token",
  },
  USER: {
    ME: "/user/me",
    UPDATE: "/user/update",
  },
};

export { API };