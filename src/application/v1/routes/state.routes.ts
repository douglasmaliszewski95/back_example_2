import { Router } from 'express';

import StateControllerFactory from '@infra/factories/controllers/state.controller.factory';
import { stateIdParamValidator } from '@application/middleware/validators/state/stateId-param-validator';
import { createStateValidator } from '@application/middleware/validators/state/create-state-validator';
import { updateStateValidator } from '@application/middleware/validators/state/update-state-validator';

const stateRoutes = Router();

(async () => {
  stateRoutes.get('/', (await StateControllerFactory.make()).list);
  stateRoutes.get('/:stateId', stateIdParamValidator, (await StateControllerFactory.make()).listById);
  stateRoutes.post('/', createStateValidator, (await StateControllerFactory.make()).createState);
  stateRoutes.put(
    '/:stateId',
    stateIdParamValidator,
    updateStateValidator,
    (await StateControllerFactory.make()).updateState,
  );
  stateRoutes.delete('/:stateId', stateIdParamValidator, (await StateControllerFactory.make()).delete);
})();

export default stateRoutes;
