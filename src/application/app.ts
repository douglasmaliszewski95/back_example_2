import AppError from '@domain/exceptions/AppError';
import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import 'express-async-errors';
import * as http from 'http';
import cors from 'cors';

import { NOT_FOUND } from 'http-status';
import { swaggerSpec } from '@config/swagger';
import swaggerUi from 'swagger-ui-express';

interface AppOptions {
  port: number;
  host: string;
  name: string;
  middlewares?: RequestHandler[];
  routes: express.Router;
  environment: string;
}

export default class App {
  app: express.Express;
  port: number;
  host: string;
  name: string;
  middlewares?: RequestHandler[];
  routes: express.Router;
  environment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.host = options.host;
    this.name = options.name;
    this.middlewares = options.middlewares || [];
    this.routes = options.routes;
    this.environment = options.environment || '';

    this.app.use(cors());
    this.handleSwaggerDocs();
    this.handleMiddlewares();
    this.handleRoutes();
    this.handleErrorMiddlewares();
    this.handleNotFound();
  }

  private handleSwaggerDocs(): void {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at ${this.host}:${this.port}/docs`);
  }

  private handleMiddlewares(): void {
    this.middlewares?.forEach((middleware) => this.app.use(middleware));
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *   ErrorResponse:
   *    type: object
   *    properties:
   *      status:
   *        type: string
   *        default: error
   *      message:
   *        type: string
   */
  private handleErrorMiddlewares(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
      console.log({ error });
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });
  }

  private handleRoutes(): void {
    this.app.use(this.routes);
  }

  /**
   * @openapi
   * components:
   *  schemas:
   *   NotFoundResponse:
   *    type: object
   *    properties:
   *      error:
   *        type: string
   *        default: not found
   */

  private handleNotFound(): void {
    this.app.use((_request, response) => {
      response.status(NOT_FOUND).json({ error: 'not found' });
    });
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      console.log(`Aplication ${this.name} is running. Listen on ${this.host}:${this.port}`);
      console.log('Press CTRL+C to exit');
    });
  }
}
