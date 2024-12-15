import { AccountDao } from "../dao";
import { FindOptions } from "sequelize";
import { Exception } from "../../lib/errors";
import { AccountStatus } from "../../typings/enums";
import { AccountAttributes, AccountCreationBody } from "../../typings/account";

class AccountService {
  private static async generateAccountNumber() {
    try {
      while (true) {
        const accNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const accountExists = await AccountDao.fetchOne({
          where: { account_number: accNumber },
        });

        if (!accountExists) return accNumber;
      }
    } catch (error) {
      throw new Exception("Error generating account number. Please try again later.");
    }
  }

  private static async createNewAccountRecord(user_id: string) {
    try {
      const account_number = await AccountService.generateAccountNumber();
      return {
        user_id,
        balance: 0,
        status: AccountStatus.ACTIVE,
        account_number,
      }
    } catch (e) {
      throw e;
    }
  }

  static async getAccountById(id: string) {
    return await AccountDao.fetchOne({
      where: { id }
    });
  }

  static async getAccountByField(query: Partial<AccountAttributes>, opts?: FindOptions) {
    return await AccountDao.fetchOne({
      where: { ...query },
      ...opts
    });
  }

  static async createAccount(user_id: string) {
    try {
      let account: AccountCreationBody = await this.createNewAccountRecord(user_id);
      return await AccountDao.create(account as AccountAttributes);
    } catch (e) {
      throw e;
    }
  }
}

export default AccountService;