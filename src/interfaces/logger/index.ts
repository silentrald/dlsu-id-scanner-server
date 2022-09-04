import devLogger from './dev';
// import prodLogger from './prod';

// const log = process.env.NODE_ENV === 'production' ?
//   prodLogger() :
//   devLogger();

const log = devLogger();

const logger = {
  fatal: (msg: any): void => {
    log.log('fatal', msg);
  },

  error: (msg: any): void => {
    log.log('error', msg);
  },

  warn: (msg: any): void => {
    log.log('warn', msg);
  },

  info: (msg: any): void => {
    log.log('info', msg);
  },

  debug: (msg: any): void => {
    log.log('debug', msg);
  },

  trace: (msg: any): void => {
    log.log('trace', msg);
  }
};

export default logger;
