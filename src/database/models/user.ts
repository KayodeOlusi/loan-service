'use strict';
import {
  Model,
  DataTypes,
} from "sequelize";
import db from "./index";
import { ModelType } from "./types";
import { AccountStatus } from "../../typings/enums";

interface UserAttributes {
  first_name: string;
  last_name: string;
  account_status: AccountStatus;
  email: string;
  password: string;
  is_verified: boolean;
  phone_number: string;
  id: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public account_status!: AccountStatus;
  public email!: string;
  public is_verified!: boolean;
  public phone_number!: string;
  public password!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

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
}, {
  sequelize: db.sequelize,
  modelName: 'User',
});
