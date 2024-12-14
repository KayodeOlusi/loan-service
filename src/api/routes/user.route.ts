import express from "express";
import validator from "../../lib/validators";
import { UserController as Controller } from "../controllers";
import UserValidatorSchema from "../../lib/validators/user-validator.schema";

const router = express.Router();
function createUserRoute() {
  router.post("/register", validator(UserValidatorSchema.RegisterUser), Controller.register);
  router.post("/login", validator(UserValidatorSchema.LoginUser), Controller.login);

  return router;
}

export default createUserRoute;