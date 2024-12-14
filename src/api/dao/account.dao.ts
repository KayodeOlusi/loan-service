import db from "../../database/models/db.initializer";
import { AccountAttributes, AccountCreationBody } from "../../typings/account";
import { FindOptions, UpdateOptions, DestroyOptions, Optional } from "sequelize";
class AccountDao {
  constructor() {
  }

  async fetchOne(query: FindOptions) {
    return await db.models.Account.findOne(query);
  }

  async fetchAll(query: FindOptions) {
    return await db.models.Account.findAll(query);
  }

  async fetchByPk(key: string) {
    return await db.models.Account.findByPk(key);
  }

  async create(record: Optional<AccountAttributes, never>) {
    return await db.models.Account.create(record);
  }

  async updateOne(record: Partial<AccountCreationBody>, query: UpdateOptions) {
    return await db.models.Account.update(record, query);
  }

  async delete(query: DestroyOptions) {
    return await db.models.Account.destroy(query);
  }
}

export default AccountDao;