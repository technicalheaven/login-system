import sequelize, { Model } from "sequelize";
import { dbInstance } from "../../../database/connection";


export interface UserAttributes {
  userId: string;
  mobileNumber: string;
  email: string;
  password: string;
  countryCode: string;
  country:string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
  deletedAt: string;
}

export class User extends Model<UserAttributes> {
  declare userId: string;
  declare mobileNumber: string;
  declare email: string;
  declare password: string;
  declare countryCode: string;
  declare country:string;
  declare createdBy: string;
  declare createdAt: string;
  declare updatedBy: string;
  declare updatedAt: string;
  declare deletedBy: string;
  declare deletedAt: string;
}

User.init(
  {
    userId: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    mobileNumber: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: true,
    },
    countryCode: {
      type: sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: sequelize.STRING,
      allowNull: true,
    },
    createdBy: {
      type: sequelize.UUID,
      allowNull: true,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updatedBy: {
      type: sequelize.UUID,
      allowNull: true,
    },
    updatedAt: {
      type: sequelize.DATE,
    },
    deletedBy: {
      type: sequelize.UUID,
      allowNull: true,
    },
    deletedAt: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: false,
    sequelize: dbInstance,
  }
);

export default User;
