import Logger from "../../lib/logger";
import { ApiBuilders } from "../api.builders";
import { Request, Response } from "express";
import { HttpStatusCodes } from "../../lib/codes";
import { UserCreationBody } from "../../typings/user";
import { BadRequestException, Exception } from "../../lib/errors";
import { EncryptService, UserService } from "../services";
import { AccountStatus } from "../../typings/enums";

class UserController {
  private static async _createUserRecord(data: UserCreationBody) {
    try {
      return await UserService.createRecord(data);
    } catch (e) {
      return null;
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const body: UserCreationBody = req.body;

      let email = body.email.trim().toLocaleLowerCase();
      let phone_number = body.phone_number;
      const emailExists = await UserService.getUserByField({
        email
      });
      const phoneExists = await UserService.getUserByField({
        phone_number
      });

      if (emailExists) {
        return ApiBuilders.buildResponse(res, {
          status: false,
          code: HttpStatusCodes.BAD_REQUEST,
          message: "User already exists",
          data: null
        });
      }

      if (phoneExists) {
        return ApiBuilders.buildResponse(res, {
          status: false,
          code: HttpStatusCodes.BAD_REQUEST,
          message: "Phone number already exists",
          data: null
        });
      }

      const data = {
        is_verified: false,
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number,
        account_status: AccountStatus.ACTIVE,
        email: body.email.toLocaleLowerCase(),
        password: EncryptService.hash(body.password),
      };

      const user = await UserController._createUserRecord(data);
      if (!user) throw new Exception("Error creating user account. Try again later");


      // TODO:
      /**
       * 1. create hash password function ✅
       * 2. hash passowrd, ✅
       * 3. create token function, ✅
       * 4. save user record, ✅
       * 5. create account for user,
       * 6. send back token and user created details
       * */

      return ApiBuilders.buildResponse(res, {
        status: true,
        data: user,
        code: HttpStatusCodes.RESOURCE_CREATED,
        message: "User account has been created successfully"
      });

    } catch (e) {
      const error = e as Exception;

      Logger.error(error.message, error);
      return ApiBuilders.buildResponse(res, {
        status: false,
        code: error.code || HttpStatusCodes.SERVER_ERROR,
        message: error.message || "An error occured, Try again later",
        data: null
      });
    }
  }

  static async login(req: Request, res: Response) {
    return ApiBuilders.buildResponse(res, {
      status: true,
      code: HttpStatusCodes.SUCCESSFUL_REQUEST,
      data: null,
      message: "Login Success!!!"
    });
  }
}

export default UserController;