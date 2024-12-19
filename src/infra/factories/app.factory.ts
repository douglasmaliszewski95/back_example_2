import express, { RequestHandler } from 'express';

import { Router } from 'express';

import App from '@application/app';
import { appConfig } from '@config/app-config';

export default class AppFactory {
  static async make(routes: Router): Promise<App> {
    const middlewares: RequestHandler[] = [];

    middlewares.push(express.json());

    return new App({
      port: appConfig.APP_PORT,
      host: appConfig.APP_HOST,
      name: appConfig.APPLICATION_NAME,
      middlewares,
      routes,
      environment: appConfig.APP_ENVIRONMENT,
    });
  }
}
