import Logger from "../../lib/logger";
import { ApiBuilders } from "../api.builders";
import { Request, Response } from "express";
import { HttpStatusCodes } from "../../lib/codes";
import { UserCreationBody } from "../../typings/user";
import { Exception } from "../../lib/errors";
import { EncryptService, UserService } from "../services";
import { AccountStatus } from "../../typings/enums";
import AccountService from "../services/account.service";

class UserController {
  private static async _createUserRecord(data: UserCreationBody) {
    const user = await UserService.createUser(data);
    if (!user) throw new Exception("Error creating user account. Try again later");

    return user;
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
      await AccountService.createAccount(user.id);

      let newUser = { ...user.toJSON() };
      delete newUser.password;

      return ApiBuilders.buildResponse(res, {
        status: true,
        data: newUser,
        code: HttpStatusCodes.RESOURCE_CREATED,
        message: "User account has been created successfully"
      });

    } catch (e) {
      const error = e as Exception;

      Logger.error(error.message, error);
      return ApiBuilders.buildResponse(res, {
        status: false,
        code: error.code || HttpStatusCodes.SERVER_ERROR,
        message: error.message || "An error occurred, Try again later",
        data: null
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByField({
        email: email.trim().toLocaleLowerCase()
      });
      if (!user) {
        return ApiBuilders.buildResponse(res, {
          status: false,
          code: HttpStatusCodes.BAD_REQUEST,
          message: "User does not exist",
          data: null
        });
      }

      const passwordMatch = await EncryptService.compare(password, user.password);
      if (!passwordMatch) {
        return ApiBuilders.buildResponse(res, {
          status: false,
          code: HttpStatusCodes.VALIDATION_ERROR,
          message: "Invalid login details",
          data: null,
        });
      }

      const _token = EncryptService.generateToken(user);
      const data = {
        token: _token,
        ...user.toJSON()
      };

      delete data.password;
      return ApiBuilders.buildResponse(res, {
        data,
        code: HttpStatusCodes.SUCCESSFUL_REQUEST,
        message: "User logged in successfully",
        status: true
      })
    } catch (e) {
      const error = e as Exception;

      Logger.error(error.message, error);
      return ApiBuilders.buildResponse(res, {
        status: false,
        code: error.code || HttpStatusCodes.SERVER_ERROR,
        message: error.message || "An error occurred, Try again later",
        data: null
      });
    }
  }
}

export default UserController;