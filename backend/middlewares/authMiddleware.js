const { jwtTokenService } = require("../services/jwt/JwtTokenService.js");
const { userService } = require("../services/user/UserService.js");

const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    // Scenario 1: No token provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
        code: "NO_TOKEN"
      });
    }

    // Verify token
    let decoded;
    try {
      // decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      decoded = await jwtTokenService.verifyAccessToken(token);
    } catch (jwtError) {
      
      // Scenario 2: Token expired
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access token expired",
          code: "TOKEN_EXPIRED"
        });
      }
      
      // Scenario 3: Invalid token (malformed, tampered)
      if (jwtError.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
          code: "INVALID_TOKEN"
        });
      }

      // Other JWT errors
      return res.status(401).json({
        success: false,
        message: "Token verification failed",
        code: "TOKEN_VERIFICATION_FAILED"
      });
    }

    // Scenario 4: Check if user still exists in database
    const user = await userService.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
        code: "USER_NOT_FOUND"
      });
    }

    // Scenario 5: Check if user is active/not blocked
    if (!user.dataValues.isActivated) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
        code: "ACCOUNT_DEACTIVATED"
      });
    }

    // // Scenario 6: Token was issued before password change
    // if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Password was changed. Please login again.",
    //     code: "PASSWORD_CHANGED"
    //   });
    // }

    // All checks passed - attach user to request
    if (req.user) {
      req.user = {
        ...req.user,
        ...user.dataValues
      }
    } else {
      req.user = {};
    }

    req.user = {
      ...user.dataValues
    };
    
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
      code: "AUTH_ERROR"
    });
  }
};

module.exports = { authenticate };