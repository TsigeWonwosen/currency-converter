#!/usr/bin/env node

const Server = require('serverHelper');
const logger = require('logger');
const process = require('process');

switch (process.env.MODULE) {
  case 'backend':
    const backend = require('../modules/backend');
    return new Server(backend, backend.defaultPort, backend.settings).start();
    break;

  default:
    return;
}

const backend = require('../modules/backend');

const servers = [
  new Server(backend, backend.defaultPort, backend.settings),
];
   const server = servers[0];
  return server.start();
