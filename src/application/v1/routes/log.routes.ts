import { Router } from 'express';

import LogControllerFactory from '@infra/factories/controllers/log.controller.factory';

const logRoutes = Router();

(async () => {
  logRoutes.get('/', (await LogControllerFactory.make()).list);
})();

export default logRoutes;
