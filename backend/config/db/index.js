import Database from "./Database.js";

const databaseInstance = new Database();
const sequelize = databaseInstance.getSequelize();

export { databaseInstance, sequelize };
