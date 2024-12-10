import express from "express";
import validator from "../../lib/validators";
import { ApiBuilders } from "../api.builders";
import { HttpStatusCodes } from "../../lib/codes";
import UserValidatorSchema from "../../lib/validators/user-validator.schema";

const router = express.Router();
function createUserRoute() {
  router.post("/register", validator(UserValidatorSchema.RegisterUser), (req, res) => {
    return ApiBuilders.buildResponse(res, {
      status: true,
      code: HttpStatusCodes.RESOURCE_CREATED,
      message: "Created",
      data: null
    })
  });
  router.post("/login", validator(UserValidatorSchema.LoginUser), (req, res) => {
    return ApiBuilders.buildResponse(res, {
      status: true,
      code: HttpStatusCodes.RESOURCE_CREATED,
      message: "Created",
      data: null
    })
  });

  return router;
}

export default createUserRoute;