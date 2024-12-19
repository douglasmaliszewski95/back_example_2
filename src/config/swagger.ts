import swaggerJsdoc from 'swagger-jsdoc';
import { appConfig } from './app-config';
import { version, description } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: appConfig.APPLICATION_NAME,
      version,
      description,
    },
    servers: [
      {
        url: `${appConfig.APP_HOST}:${appConfig.APP_PORT}/api/v1`,
      },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['http'],
  },
  apis: ['src/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
