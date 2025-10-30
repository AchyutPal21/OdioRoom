import { app } from "./app.js";
import { PORT, HOST, NODE_ENV } from "./secrets.js";
import { databaseInstance } from "./config/db/index.js";


(async () => {
  try {
    // 1 Connect to DB
    await databaseInstance.connect();

    // 2 Sync models (only in DEV or staging, not recommended in PROD)
    if (NODE_ENV === "DEV") {
      await databaseInstance.getSequelize().sync({ alter: true });
      console.log("Database models synchronized");
    }

    // 3 Start the server
    const server = app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT} [${NODE_ENV}]`);
    });

    // 4 Handle server errors
    server.on("error", (error) => {
      console.error(`Server error: ${error.message}`);
      if (NODE_ENV === "DEV") console.error(error.stack);
    });

    // 5 Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("⚡ SIGINT received. Closing server...");
      await databaseInstance.disconnect();
      server.close(() => console.log("Server closed"));
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("⚡ SIGTERM received. Closing server...");
      await databaseInstance.disconnect();
      server.close(() => console.log("Server closed"));
      process.exit(0);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();