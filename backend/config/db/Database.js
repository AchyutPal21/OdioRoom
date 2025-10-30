import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT, DB_PORT, NODE_ENV } from "../../secrets.js";

class Database {
  #sequelize = null;
  constructor() {
    this.#sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: DB_DIALECT,
      logging: NODE_ENV === "DEV" ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
  }

  async connect() {
    try {
      await this.#sequelize.authenticate();
      console.log("Database connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error.message);
      process.exit(1);
    }
  }

  getSequelize() {
    return this.#sequelize;
  }
}

export default Database;
