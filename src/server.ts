import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes/index';
import uploadConfig from './config/uploads';
import AppError from './errors/AppError';

import './database';
import { NativescriptConnectionOptions } from 'typeorm/driver/nativescript/NativescriptConnectionOptions';

const app = express();
app.use(express.json());
app.use('/file', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'Error',
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      error: 'Error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🙏️ Run service in port 3333');
});
