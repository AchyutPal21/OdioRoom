import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TTL, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TTL } from "../../secrets.js";

class JwtTokenService {
  async generateAccessToken(payload) {
    try {
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: ACCESS_TOKEN_TTL,
      });

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate token");
    }
  }

  async generateRefreshToken(payload) {
    try {
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: REFRESH_TOKEN_TTL,
      });

      return refreshToken;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate token");
    }
  }

  async validateToken() {

  }
}

const jwtTokenService = new JwtTokenService();
export { jwtTokenService };