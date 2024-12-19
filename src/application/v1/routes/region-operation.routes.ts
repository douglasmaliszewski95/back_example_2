import RegionOperationControllerFactory from '@infra/factories/controllers/region-operation.controller.factory';
import { Router } from 'express';

const regionOperationRoutes = Router();

(async () => {
  regionOperationRoutes.get('/', (await RegionOperationControllerFactory.make()).list);
})();

export default regionOperationRoutes;
