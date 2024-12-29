import { NextFunction, Request, Response } from "express";
import { ApiBuilders } from "../api.builders";
import {
  Exception,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException
} from "../../lib/errors";
import { EncryptService, UserService } from "../services";
import { UserAttributes } from "../../typings/user";
import { AccountStatus } from "../../typings/enums";
import { HttpStatusCodes } from "../../lib/codes";

async function checkIncomingReq(req: Request) {
  let token = req.headers["Authorization"] || req.headers["authorization"];
  if (!token || typeof token !== "string") throw new UnauthorizedException("User not authorized");
  if (!token.startsWith("Bearer ")) throw new UnauthorizedException("Invalid token format");

  token = token.split(" ")[1];
  const decoded = EncryptService.verify(token, process.env.TOKEN_ID as string) as UserAttributes;
  if (!decoded || !decoded.id) throw new UnauthorizedException("Invalid token");

  const user = await UserService.getUserByField({ id: decoded.id });
  if (!user) throw new NotFoundException("User does not exist");
  if (user.account_status === AccountStatus.SUSPENDED) throw new ForbiddenException("Account is suspended");

  return user;
}

async function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedUser = await checkIncomingReq(req);
    if (!validatedUser) {
      return ApiBuilders.buildResponse(res, {
        status: false,
        code: HttpStatusCodes.SERVER_ERROR,
        message: "Unable to validate user",
        data: null,
      });
    }

    req.user = validatedUser;
    next();
  } catch (e) {
    const error = e as Exception;
    return ApiBuilders.buildResponse(res, {
      data: null,
      status: false,
      code: error.code,
      message: error.message
    });
  }
}

export default verifyAuth;