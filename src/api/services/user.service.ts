import { UserDao } from "../dao";
import { FindOptions, Optional } from "sequelize";
import { UserAttributes, UserCreationBody } from "../../typings/user";

class UserService {
  static async getUserByField(record: Partial<UserAttributes>, opts?: FindOptions) {
    return await UserDao.fetchOne({
      where: { ...record },
      ...opts
    });
  }

  static async createRecord(user: UserCreationBody) {
    let record = user as UserAttributes;
    return await UserDao.create(record);
  }
}

export default UserService;