import events from 'events';
import winston from 'winston';
import { timeStamp } from '../../utils/commonUtils';

const logHandler = new events.EventEmitter();

export const mailError = (error) => `MailError: ${error}`;
export const mongoError = (error) => `MongoDBError: ${error}`;
export const s3Error = (error) => `s3Error: ${error}`;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: './.logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './.logs/combined.log' }),
  ],
});

if (!['production', 'test'].includes(process.env.NODE_ENV)) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logHandler.on('error', (message) => {
  logger.log({
    level: 'error',
    message: `[${timeStamp()}] ${message}`,
  });
});

logHandler.on('warning', (message) => {
  logger.log({
    level: 'warn',
    message: `[${timeStamp()}] ${message}`,
  });
});

logHandler.on('info', (message) => {
  logger.log({
    level: 'info',
    message: `[${timeStamp()}] ${message}`,
  });
});

export default logHandler;
