import Logger from "../../lib/logger";
import { Request, Response, NextFunction } from "express";

function reqLogger(req: Request, res: Response, next: NextFunction) {
  const { method, url } = req;
  Logger.info(`${method} | ${url}`);

  next();
}

export default reqLogger;