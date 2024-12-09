import * as winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    }),
    new winston.transports.File({
      filename: "./logs/index.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    })
  ]
});

class Logger {
  static info(message: string) {
    logger.info(message);
  }

  static warn(message: string) {
    logger.warn(message);
  }

  static error(message: string, error: Error) {
    logger.error(message, {
      stack: error.stack,
    });
  }
}

export default Logger;