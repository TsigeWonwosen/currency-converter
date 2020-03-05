const winston = require('winston');
const fs = require('fs');
const moment = require('moment');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => moment().format('YYYY-MM-DD HH:mm:ss');
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      level: env === 'development' ? 'debug' : 'info',
    }),
  ],
});

module.exports = logger;
