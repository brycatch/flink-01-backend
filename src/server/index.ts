// Node packages
import http from 'http';
import path from 'path';

// Utils
import express from 'express';
import cors from 'cors';
import compression from 'compression';

// Sockets
import socketIO from 'socket.io';
import socketServer from '../network/sockets.network';

// Config (env variables)
import config from '../config';

// Database
import database from '../database';

// Routing
import routes from '../network/routes.network';

// Error handler
import errorHandler from '../network/error-handler.network';

/**
 * Singleton class for a new HTTP Server
 */
export default class Server {
  public httpServer = new http.Server;
  private static _instance: Server;

  public app: express.Application;
  public io: socketIO.Server;
  public port: number;

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    this.app = express();
    this.port = config.port;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
  }

  public init(cb: any) {
    this.setDatabase();
    this.setEncoded();
    this.setCors();
    this.setRoutes();
    this.setSockets();    
    this.setCompression();
    this.setErrorHandler();
    this.httpServer.listen(this.port, cb);
  }

  private setDatabase() {
    database.connect(this.app);
  }

  private setEncoded() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  private setCors() {
    this.app.use(cors({ origin: true, credentials: true }));
  }

  private setRoutes() {
    routes(this.app);
  }

  private setSockets() {
    socketServer.listen(this.io);
  }

  private setCompression() {
    this.app.use(compression);
  }

  private setErrorHandler() {
    this.app.use(errorHandler);
  }

}