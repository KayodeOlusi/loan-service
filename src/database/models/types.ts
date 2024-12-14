import User from "./user";
import Account from "./account";
import { ModelStatic } from "sequelize";

type ModelNames = {
  User: User,
  Account: Account
}

type ModelType = {
  models: {
    [K in keyof ModelNames]: ModelStatic<ModelNames[K]>
  }
}

export {
  ModelType,
  ModelNames
}