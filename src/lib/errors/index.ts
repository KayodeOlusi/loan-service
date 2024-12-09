import { HttpStatusCodes } from "../codes";

interface ErrorCode {
  code: number;
}

class BadRequestException extends Error implements ErrorCode {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
    this.code = HttpStatusCodes.BAD_REQUEST;
  }
}

class ValidationException extends Error implements ErrorCode {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = "ValidationException";
    this.code = HttpStatusCodes.VALIDATION_ERROR;
  }
}

class NotFoundException extends Error implements ErrorCode {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
    this.code = HttpStatusCodes.NOT_FOUND;
  }
}

export {
  NotFoundException,
  ValidationException,
  BadRequestException
}