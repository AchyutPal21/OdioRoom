import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db/index.js";

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  countryCode: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: true,
});

export {User}