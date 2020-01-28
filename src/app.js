import express from 'express';
import http from 'http';
import socket from 'socket.io';
import redisAdapter from 'socket.io-redis';
import statusMonitor from 'express-status-monitor';
import routes from './router';

require('dotenv').config({});
require('./database');

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.socket();

    this.middleware();
    this.routes();
  }

  socket() {
    this.io = socket(3001, {
      path: '/ws'
    });

    this.io.adapter(
      redisAdapter({
        host: 'localhost',
        port: 6379
      })
    );

    this.io.on('connection', function(connection) {
      console.log('connection');
      connection.emit('news', { hello: 'world' });
      connection.on('my other event', function(data) {
        console.log(data);
      });
    });
  }

  middleware() {
    this.app.use(this.expressStatusMonitor());
    this.app.use(express.json());
    this.app.use((req, _, next) => {
      req.io = this.io;
      next();
    });
  }

  expressStatusMonitor() {
    return statusMonitor({
      websocket: this.io,
      port: 3001,
      socketPath: '/ws',
      chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true
      },
      healthChecks: [
        {
          protocol: 'http',
          host: 'localhost',
          path: '/coordinates/-23.548921,-46.872873',
          port: '3333'
        }
      ]
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
