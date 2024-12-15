import db from "../../database/models/db.initializer";
import { AccountAttributes, AccountCreationBody } from "../../typings/account";
import { FindOptions, UpdateOptions, DestroyOptions, Optional, CreateOptions } from "sequelize";
class AccountDao {
  constructor() {
  }

  static async fetchOne(query: FindOptions) {
    return await db.models.Account.findOne(query);
  }

  static async fetchAll(query: FindOptions) {
    return await db.models.Account.findAll(query);
  }

  static async fetchByPk(key: string) {
    return await db.models.Account.findByPk(key);
  }

  static async create(record: Optional<AccountAttributes, never>, opts?: CreateOptions) {
    return await db.models.Account.create(record, opts);
  }

  static async updateOne(record: Partial<AccountCreationBody>, query: UpdateOptions) {
    return await db.models.Account.update(record, query);
  }

  static async delete(query: DestroyOptions) {
    return await db.models.Account.destroy(query);
  }
}

export default AccountDao;