import { app } from "./app.js";
import { PORT, NODE_ENV, DB_SYNC } from "./secrets.js";
import { databaseInstance } from "./config/db/index.js";

const startServer = async () => {
  try {
    await databaseInstance.connect();

    if (NODE_ENV === "DEV" && DB_SYNC === "true") {
      await databaseInstance.getSequelize().sync({ alter: true });
      console.log("Models synchronized (DEV only)");
    } else {
      console.log("Skipping model sync in production");
    }

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} [${NODE_ENV}]`);
    });

    const shutdown = async () => {
      console.log("⚡ Gracefully shutting down...");
      server.close(async () => {
        console.log("HTTP server closed");
        await databaseInstance.disconnect();
        console.log("Database disconnected");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
      process.exit(1);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
