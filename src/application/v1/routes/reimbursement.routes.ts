import { Router } from 'express';
import ReimbursementControllerFactory from '@infra/factories/controllers/reimbursement.controller.factory';
import { userIdParamValidator } from '@application/middleware/validators/user/user-id-param-validator';
// eslint-disable-next-line max-len
import { reimbursementIdParamValidator } from '@application/middleware/validators/reimbursement/reimbursement-id-param-validator';
// eslint-disable-next-line max-len
import { createReimbursementValidator } from '@application/middleware/validators/reimbursement/create-reimbursement-validator';
// eslint-disable-next-line max-len
import { approveReimbursementValidator } from '@application/middleware/validators/reimbursement/approve-reimbursement-validator';
import multer from 'multer';

const reimbursementRoutes = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

(async () => {
  reimbursementRoutes.get('/', (await ReimbursementControllerFactory.make()).list);

  reimbursementRoutes.post(
    '/',
    upload.single('files'),
    createReimbursementValidator,
    (await ReimbursementControllerFactory.make()).createReimbursement,
  );

  reimbursementRoutes.post(
    '/approve',
    approveReimbursementValidator,
    (await ReimbursementControllerFactory.make()).approve,
  );

  reimbursementRoutes.post(
    '/addEvidences/:reimbursementId',
    upload.array('files', 5),
    (await ReimbursementControllerFactory.make()).addReimbursementEvidences,
  );

  reimbursementRoutes.get(
    '/user/:userId',
    userIdParamValidator,
    (await ReimbursementControllerFactory.make()).listByUser,
  );

  reimbursementRoutes.get(
    '/:reimbursementId',
    reimbursementIdParamValidator,
    (await ReimbursementControllerFactory.make()).show,
  );
})();

export default reimbursementRoutes;
