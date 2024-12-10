'use strict';
import {
  DataTypes, InferAttributes, 
  InferCreationAttributes,
  Model, Optional, CreationOptional
} from "sequelize";
import db from "./index";
import { ModelType } from "./types";
import { AccountStatus } from "../../typings/enums";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare public id: CreationOptional<string>;
  declare public first_name: string;
  declare public last_name: string;
  declare public account_status: AccountStatus;
  declare public email: string;
  declare public password: string;
  declare public is_verified: boolean;
  declare phone_number: string;

  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: ModelType["models"]) {
    // define association here
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  account_status: DataTypes.ENUM("ACTIVE", "SUSPENDED"),
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  is_verified: DataTypes.BOOLEAN,
  phone_number: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.sequelize,
  modelName: 'User',
});

export default User;

