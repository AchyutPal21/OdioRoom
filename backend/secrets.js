import { config } from "dotenv";
config();

// SERVER SECRETS
const PORT = parseInt(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || "DEV";
const HOST = process.env.HOST || "localhost";

// CORS
const ALLOWED_CORS = process.env.ALLOWED_CORS ? process.env.ALLOWED_CORS.split(",") : [];



// OTP
const OTP_ALGORITHM = process.env.OTP_ALGORITHM;
const OTP_SECRET = process.env.OTP_SECRET;
const OTP_TTL = process.env.OTP_TTL;
// Twilio
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;
// Mailtrap
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Database
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_PORT = process.env.DB_PORT;

export {
  PORT,
  NODE_ENV,
  HOST,
  ALLOWED_CORS,
  OTP_ALGORITHM,
  OTP_SECRET,
  OTP_TTL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DIALECT,
  DB_PORT
};