import AgencyControllerFactory from '@infra/factories/controllers/agency.controller.factory';
import { Router } from 'express';

const agencyRoutes = Router();

(async () => {
  agencyRoutes.get('/', (await AgencyControllerFactory.make()).list);
})();

export default agencyRoutes;
