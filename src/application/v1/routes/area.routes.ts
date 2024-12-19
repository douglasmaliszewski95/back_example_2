import { Router } from 'express';

import AreaControllerFactory from '@infra/factories/controllers/area.controller.factory';
import { createAreaValidator } from '@application/middleware/validators/area/create-area-validator';
import { areaIdParamValidator } from '@application/middleware/validators/area/area-id-param-validator';
import { updateAreaValidator } from '@application/middleware/validators/area/update-area-validator';

const areaRoutes = Router();

(async () => {
  areaRoutes.get('/', (await AreaControllerFactory.make()).list);
  areaRoutes.get('/:areaId', areaIdParamValidator, (await AreaControllerFactory.make()).findById);
  areaRoutes.post('/', createAreaValidator, (await AreaControllerFactory.make()).createArea);
  areaRoutes.put(
    '/:areaId',
    areaIdParamValidator,
    updateAreaValidator,
    (await AreaControllerFactory.make()).updateArea,
  );
  areaRoutes.delete('/:areaId', areaIdParamValidator, (await AreaControllerFactory.make()).delete);
})();

export default areaRoutes;
