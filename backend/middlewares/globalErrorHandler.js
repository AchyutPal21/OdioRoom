import { NODE_ENV } from "../secrets.js";

export const globalErrorHandler = (err, req, res, next) => {

  if ("DEV" === NODE_ENV) {
    console.error(`ERROR from globalHandler`, err);
  }

  const statusCode = res.statusCode === 200 ? 500 : req.statusCode;
  res.status(statusCode).json({
    status: false,
    message: err.message || "Something went wrong!",
  });
}