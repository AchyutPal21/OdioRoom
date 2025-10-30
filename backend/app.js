import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { ALLOWED_CORS, NODE_ENV } from "./secrets.js";
import { indexRouter } from "./routes/index.route.js";

const app = express();

// <> PARSE: json
app.use(express.json());

// <> COOKIE: parser
app.use(cookieParser());

// <> DEV: response
if ("DEV" === NODE_ENV) {
  app.use(morgan("dev"));
}

// <> CORS: config
const whitelist = ALLOWED_CORS;
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests for *all* routes
app.options(/.*/, cors(corsOptions));

// <> ROUTES: route
app.use("/api/v1", indexRouter);



// <> MIDDLEWARE: Global error handler
app.use(globalErrorHandler);


export { app };