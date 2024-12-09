import { Model } from "sequelize";

type ModelType = {
  models: {
    [key: string]: typeof Model
  }
}

export {
  ModelType
}