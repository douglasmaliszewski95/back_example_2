import { Router } from 'express';

import PositionControllerFactory from '@infra/factories/controllers/position.controller.factory';
import { positionIdParamValidator } from '@application/middleware/validators/position/position-id-param-validator';
import { createPositionValidator } from '@application/middleware/validators/position/create-position-validator';
import { updatePositionValidator } from '@application/middleware/validators/position/update-position-validator';

const positionRoutes = Router();

(async () => {
  positionRoutes.get('/', (await PositionControllerFactory.make()).list);
  positionRoutes.get('/:positionId', positionIdParamValidator, (await PositionControllerFactory.make()).findById);
  positionRoutes.post('/', createPositionValidator, (await PositionControllerFactory.make()).createPosition);
  positionRoutes.put(
    '/:positionId',
    positionIdParamValidator,
    updatePositionValidator,
    (await PositionControllerFactory.make()).updatePosition,
  );
  positionRoutes.delete('/:positionId', positionIdParamValidator, (await PositionControllerFactory.make()).delete);
})();

export default positionRoutes;
