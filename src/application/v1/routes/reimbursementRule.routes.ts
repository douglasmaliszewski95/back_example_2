import { Router } from 'express';
import ReimbursementRuleControllerFactory from '@infra/factories/controllers/reimbursementRule.controller.factory';
// eslint-disable-next-line max-len
import { reimbursementRuleIdParamValidator } from '@application/middleware/validators/reimbursementRule/reimbursementRuleId-param-validator';
// eslint-disable-next-line max-len
import { updateRuleValidator } from '@application/middleware/validators/reimbursementRule/update-reimbursementRule-validator';
// eslint-disable-next-line max-len
import { createRuleValidator } from '@application/middleware/validators/reimbursementRule/create-reimbursementRule-validator';
import { rulesByUserValidator } from '@application/middleware/validators/reimbursementRule/rulesByUser-validator';
import { userIdParamValidator } from '@application/middleware/validators/user/user-id-param-validator';

const reimbursementRuleRoutes = Router();

(async () => {
  reimbursementRuleRoutes.get('/', (await ReimbursementRuleControllerFactory.make()).list);
  reimbursementRuleRoutes.get(
    '/:reimbursementRuleId',
    reimbursementRuleIdParamValidator,
    (await ReimbursementRuleControllerFactory.make()).listById,
  );
  reimbursementRuleRoutes.post(
    '/byUser',
    rulesByUserValidator,
    (await ReimbursementRuleControllerFactory.make()).listRulesByUserId,
  );
  reimbursementRuleRoutes.post(
    '/:userId',
    userIdParamValidator,
    createRuleValidator,
    (await ReimbursementRuleControllerFactory.make()).createRule,
  );
  reimbursementRuleRoutes.put(
    '/:reimbursementRuleId',
    reimbursementRuleIdParamValidator,
    updateRuleValidator,
    (await ReimbursementRuleControllerFactory.make()).updateRule,
  );
  reimbursementRuleRoutes.post(
    '/enable_disable/:reimbursementRuleId',
    reimbursementRuleIdParamValidator,
    (await ReimbursementRuleControllerFactory.make()).enableDisable,
  );
})();

export default reimbursementRuleRoutes;
