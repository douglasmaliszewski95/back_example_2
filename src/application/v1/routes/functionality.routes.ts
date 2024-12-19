import { Router } from 'express';

import FunctionalityControllerFactory from '@infra/factories/controllers/functionality.controller.factory';
// eslint-disable-next-line max-len
import { createFunctionalityValidator } from '@application/middleware/validators/functionality/create-functionality-validator';
// eslint-disable-next-line max-len
import { functionalityIdParamValidator } from '@application/middleware/validators/functionality/functionality-id-param-validator';
// eslint-disable-next-line max-len
import { updateFunctionalityValidator } from '@application/middleware/validators/functionality/update-functionality-validator';

const functionalityRoutes = Router();

(async () => {
  functionalityRoutes.get('/', (await FunctionalityControllerFactory.make()).list);
  functionalityRoutes.get(
    '/:functionalityId',
    functionalityIdParamValidator,
    (await FunctionalityControllerFactory.make()).findById,
  );
  functionalityRoutes.post(
    '/',
    createFunctionalityValidator,
    (await FunctionalityControllerFactory.make()).createFunctionality,
  );
  functionalityRoutes.put(
    '/:functionalityId',
    functionalityIdParamValidator,
    updateFunctionalityValidator,
    (await FunctionalityControllerFactory.make()).updateFunctionality,
  );
  functionalityRoutes.delete(
    '/:functionalityId',
    functionalityIdParamValidator,
    (await FunctionalityControllerFactory.make()).delete,
  );
})();

export default functionalityRoutes;
