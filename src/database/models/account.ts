'use strict';
import {
  DataTypes, InferAttributes, 
  InferCreationAttributes,
  Model, CreationOptional
} from "sequelize";
import db from "./index";
import { ModelType } from "./types";
import { AccountStatus } from "../../typings/enums";

class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
  declare public id: CreationOptional<string>;
  declare public user_id: string;
  declare public status: AccountStatus;
  declare public account_number: string;
  declare public balance: number;

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

Account.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: DataTypes.STRING,
  account_number: DataTypes.STRING,
  balance: DataTypes.DECIMAL(30, 2),
  status: DataTypes.ENUM("ACTIVE", "SUSPENDED"),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.sequelize,
  modelName: 'Account',
});

