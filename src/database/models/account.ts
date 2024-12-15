'use strict';
import {
  Model,
  DataTypes,
} from "sequelize";
import db from "./index";
import { ModelType } from "./types";
import { AccountStatus } from "../../typings/enums";
import { AccountAttributes } from "../../typings/account";

class Account extends Model<AccountAttributes> implements AccountAttributes {
  public id!: string;
  public balance!: number;
  public user_id!: string;
  public status!: AccountStatus;
  public account_number!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: ModelType["models"]) {
    // define association here
    Account.belongsTo(models.User, {
      foreignKey: "user_id"
    });
  }
}

Account.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: DataTypes.STRING,
  balance: DataTypes.DECIMAL(30, 2),
  status: DataTypes.ENUM("ACTIVE", "SUSPENDED"),
  createdAt: DataTypes.DATE,
  account_number: DataTypes.STRING,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.sequelize,
  modelName: 'Account',
});

export default Account;


