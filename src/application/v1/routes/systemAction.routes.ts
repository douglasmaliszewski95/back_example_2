import { Router } from 'express';

import SystemActionControllerFactory from '@infra/factories/controllers/systemAction.controller.factory';
// eslint-disable-next-line max-len
import { systemActionIdParamValidator } from '@application/middleware/validators/systemAction/systemActionId-param-validator';
// eslint-disable-next-line max-len
import { createSystemActionValidator } from '@application/middleware/validators/systemAction/create-systemAction-validator';
// eslint-disable-next-line max-len
import { updateSystemActionValidator } from '@application/middleware/validators/systemAction/update-systemAction-validator';

const systemActionRoutes = Router();

(async () => {
  systemActionRoutes.get('/', (await SystemActionControllerFactory.make()).list);
  systemActionRoutes.get(
    '/:systemActionId',
    systemActionIdParamValidator,
    (await SystemActionControllerFactory.make()).listById,
  );
  systemActionRoutes.post(
    '/',
    createSystemActionValidator,
    (await SystemActionControllerFactory.make()).createSystemAction,
  );
  systemActionRoutes.put(
    '/:systemActionId',
    systemActionIdParamValidator,
    updateSystemActionValidator,
    (await SystemActionControllerFactory.make()).updateSystemAction,
  );
  systemActionRoutes.delete(
    '/:systemActionId',
    systemActionIdParamValidator,
    (await SystemActionControllerFactory.make()).delete,
  );
})();

export default systemActionRoutes;
