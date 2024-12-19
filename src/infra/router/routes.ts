import { Router } from 'express';

import routerV1 from '@infra/router/routerV1';

const routes = Router();

routes.use('/api/v1', routerV1);

export default routes;
