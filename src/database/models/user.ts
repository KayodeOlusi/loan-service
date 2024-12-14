import db from "./index";
import { Model, DataTypes } from 'sequelize';
import { UserAttributes } from "../../typings/user";
import { AccountStatus } from "../../typings/enums";

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public account_status!: AccountStatus;
  public phone_number!: string;
  public is_verified!: boolean;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  account_status: DataTypes.ENUM(AccountStatus.ACTIVE, AccountStatus.SUSPENDED),
  password: DataTypes.STRING,
  is_verified: DataTypes.BOOLEAN,
  phone_number: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.sequelize,
  modelName: 'User',
});

export default User;
