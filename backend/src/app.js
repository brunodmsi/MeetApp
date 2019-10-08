import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import { resolve } from 'path';

import sentryConfig from './config/sentry';

import './database';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/api/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use('/api', routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ message: 'Internal Server Error' });
    });
  }
}

export default new App().server;
