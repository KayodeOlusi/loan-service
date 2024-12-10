import dbInit from './index';
import { ModelNames } from './types';
import {  ModelStatic } from 'sequelize';

type DynamicModels = {
  [K in keyof ModelNames]: ModelStatic<ModelNames[K]>
};

type ExtendedDb = typeof dbInit & {
  models: DynamicModels;
};

const db = dbInit as ExtendedDb;

export default db;