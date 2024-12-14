import User from "./user";
import Account from "./account";
import dbInit from "./index";
import { ModelNames } from "./types";
import { ModelStatic } from 'sequelize';

type DynamicModels = {
  [K in keyof ModelNames]: ModelStatic<ModelNames[K]>
};

type ExtendedDb = typeof dbInit & {
  models: DynamicModels;
};

const models = {
  User: User,
  Account: Account
  // Add more models here
}

const db = {
  ...dbInit,
  models,
} as ExtendedDb;

export default db;