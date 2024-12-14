import db from "../../database/models/db.initializer";
import { UserAttributes, UserCreationBody } from "../../typings/user";
import { FindOptions, UpdateOptions, DestroyOptions, Optional } from "sequelize";

class UserDao {
  constructor() {
  }

  static async fetchOne(query: FindOptions) {
    return await db.models.User.findOne(query);
  }

  static async fetchAll(query: FindOptions) {
    return await db.models.User.findAll(query);
  }

  static async fetchByPk(key: string) {
    return await db.models.User.findByPk(key);
  }
  
  static async create(record: Optional<UserAttributes, never>) {
    return await db.models.User.create(record);
  }

  static async updateOne(record: Partial<UserCreationBody>, query: UpdateOptions) {
    return await db.models.User.update(record, query);
  }

  static async delete(query: DestroyOptions) {
    return await db.models.User.destroy(query);
  }
}

export default UserDao;