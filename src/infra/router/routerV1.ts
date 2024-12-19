import { Router } from 'express';

import HealthCheckControllerFactory from '@infra/factories/controllers/health-check.controller.factory';
import userRoutes from '@application/v1/routes/user.routes';

import logRoutes from '@application/v1/routes/log.routes';
import reimbursementRoutes from '@application/v1/routes/reimbursement.routes';
import reimbursementRuleRoutes from '@application/v1/routes/reimbursementRule.routes';
import areaRoutes from '@application/v1/routes/area.routes';
import positionRoutes from '@application/v1/routes/position.routes';
import textractRoutes from '@application/v1/routes/textract.routes';
import profileRoutes from '@application/v1/routes/profile.routes';
import regionOperationRoutes from '@application/v1/routes/region-operation.routes';
import agencyRoutes from '@application/v1/routes/agency.routes';
import languageRoutes from '@application/v1/routes/language.routes';
import stateRoutes from '@application/v1/routes/state.routes';
import systemActions from '@application/v1/routes/systemAction.routes';
import functionalities from '@application/v1/routes/functionality.routes';

const routerV1 = Router();

(async () => {
  routerV1.get('/health-check', (await HealthCheckControllerFactory.make()).execute);
  routerV1.use('/users', userRoutes);
  routerV1.use('/log', logRoutes);
  routerV1.use('/reimbursement', reimbursementRoutes);
  routerV1.use('/reimbursementRules', reimbursementRuleRoutes);
  routerV1.use('/areas', areaRoutes);
  routerV1.use('/positions', positionRoutes);
  routerV1.use('/textract', textractRoutes);
  routerV1.use('/profiles', profileRoutes);
  routerV1.use('/region-operation', regionOperationRoutes);
  routerV1.use('/agencies', agencyRoutes);
  routerV1.use('/languages', languageRoutes);
  routerV1.use('/states', stateRoutes);
  routerV1.use('/systemActions', systemActions);
  routerV1.use('/functionalities', functionalities);
})();

export default routerV1;
