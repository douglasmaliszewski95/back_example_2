import { Router } from 'express';
import multer from 'multer';

import TextractControllerFactory from '@infra/factories/controllers/textract.controller.factory';

const textractRoutes = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

(async () => {
  textractRoutes.post('/', upload.single('file'), (await TextractControllerFactory.make()).extract);
})();

export default textractRoutes;
