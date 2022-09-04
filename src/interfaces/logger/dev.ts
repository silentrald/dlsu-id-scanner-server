import {
  createLogger,
  format,
  transports,
  addColors,
  Logger
} from 'winston';
const {
  combine, timestamp, printf, colorize, errors,
} = format;

const logFormat = printf(({
  level, message, timestamp, stack,
}) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = (): Logger => createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  transports: [ new transports.Console({ level: 'trace' }) ],
});

addColors({
  fatal: 'white redBG',
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'magenta',
  trace: 'white'
});

export default logger;
