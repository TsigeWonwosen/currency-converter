require('dotenv').config(); //loads .env conf

const http = require('http');
const logger = require('./logger');
const config = require('config');
const axios = require('axios');
const fs = require('fs');

module.exports = function Server(app, port, opts) {
    this.app = app;
    this.port = port;
    this.opts = opts || { hasDb: false, module: 'server' };
    this.server = null;

    this.start = async () => {
        this.server = http.createServer(app);
        this.app.set('port', this.port);
        this.listen(port);
    };

    this.listen = () => {
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    };

    this.onError = error => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };

    this.onListening = async () => {
        const addr = this.server.address();
        logger.debug(
            `[${config.app_name}] ${this.opts.module}: running ${process.env.NODE_ENV} on http://localhost:${addr.port}`
        );

      const currencyList = await axios.get(process.env.URL) || null;
       if (currencyList) {
           fs.writeFile(config.import_path, currencyList.data, function(err) {
               if(err) {
                   return logger.error(err);
               }
               logger.info("xml file loaded!");
           });
       }
    };
};
